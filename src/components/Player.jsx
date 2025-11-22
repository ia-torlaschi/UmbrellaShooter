import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier'
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import Weapon from './Weapon'
import SoundManager from '../utils/SoundManager'

const SPEED = 6
const JUMP_FORCE = 12

const Player = forwardRef((props, ref) => {
    const body = useRef()
    const group = useRef()
    const impactSphere = useRef()
    const laserBeam = useRef()
    const muzzleRef = useRef()
    const { camera, scene } = useThree()
    const { world, rapier } = useRapier()
    const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false })
    const lastFootstepTime = useRef(0)

    useImperativeHandle(ref, () => body.current)

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.code) {
                case 'KeyW': setMovement((m) => ({ ...m, forward: true })); break
                case 'KeyS': setMovement((m) => ({ ...m, backward: true })); break
                case 'KeyA': setMovement((m) => ({ ...m, left: true })); break
                case 'KeyD': setMovement((m) => ({ ...m, right: true })); break
                case 'Space': setMovement((m) => ({ ...m, jump: true })); break
            }
        }
        const handleKeyUp = (e) => {
            switch (e.code) {
                case 'KeyW': setMovement((m) => ({ ...m, forward: false })); break
                case 'KeyS': setMovement((m) => ({ ...m, backward: false })); break
                case 'KeyA': setMovement((m) => ({ ...m, left: false })); break
                case 'KeyD': setMovement((m) => ({ ...m, right: false })); break
                case 'Space': setMovement((m) => ({ ...m, jump: false })); break
            }
        }

        const handleMouseDown = () => {
            SoundManager.playShootSound()

            const camDir = new THREE.Vector3()
            camera.getWorldDirection(camDir)
            const ray = new rapier.Ray(camera.position, camDir)
            const hit = world.castRay(ray, 100, true)

            if (hit) {
                const impactPos = camDir.clone().multiplyScalar(hit.timeOfImpact).add(camera.position)

                // Visual Impact Sphere
                if (impactSphere.current) {
                    scene.remove(impactSphere.current)
                    impactSphere.current.geometry.dispose()
                    impactSphere.current.material.dispose()
                }

                const geometry = new THREE.SphereGeometry(0.5, 16, 16)
                const material = new THREE.MeshBasicMaterial({
                    color: 0xff0000,
                    toneMapped: false
                })
                const sphere = new THREE.Mesh(geometry, material)
                sphere.position.copy(impactPos)

                scene.add(sphere)
                impactSphere.current = sphere

                // Laser Beam
                if (muzzleRef.current) {
                    if (laserBeam.current) {
                        scene.remove(laserBeam.current)
                        laserBeam.current.geometry.dispose()
                        laserBeam.current.material.dispose()
                    }

                    const startPos = new THREE.Vector3()
                    muzzleRef.current.getWorldPosition(startPos)

                    const distance = startPos.distanceTo(impactPos)
                    const laserGeo = new THREE.CylinderGeometry(0.05, 0.05, distance, 8)
                    laserGeo.rotateX(-Math.PI / 2) // Rotate to align with Z axis
                    const laserMat = new THREE.MeshBasicMaterial({
                        color: 0x00ff00,
                        transparent: true,
                        opacity: 0.8,
                        toneMapped: false
                    })
                    const laser = new THREE.Mesh(laserGeo, laserMat)

                    // Position at midpoint
                    laser.position.copy(startPos).lerp(impactPos, 0.5)
                    laser.lookAt(impactPos)

                    scene.add(laser)
                    laserBeam.current = laser

                    // Muzzle Flash
                    const flashLight = new THREE.PointLight(0xffff00, 2, 5)
                    flashLight.position.copy(startPos)
                    scene.add(flashLight)

                    const flashMesh = new THREE.Mesh(
                        new THREE.SphereGeometry(0.1, 8, 8),
                        new THREE.MeshBasicMaterial({ color: 0xffff00 })
                    )
                    flashMesh.position.copy(startPos)
                    scene.add(flashMesh)

                    setTimeout(() => {
                        scene.remove(flashLight)
                        scene.remove(flashMesh)
                        flashMesh.geometry.dispose()
                        flashMesh.material.dispose()
                    }, 50)
                }

                // Hit Detection Logic
                if (hit.collider) {
                    const rigidBody = hit.collider.parent ? hit.collider.parent() : null
                    if (rigidBody && rigidBody.userData && rigidBody.userData.hit) {
                        rigidBody.userData.hit()
                    }
                }

                setTimeout(() => {
                    if (impactSphere.current) {
                        scene.remove(impactSphere.current)
                        impactSphere.current.geometry.dispose()
                        impactSphere.current.material.dispose()
                        impactSphere.current = null
                    }
                    if (laserBeam.current) {
                        scene.remove(laserBeam.current)
                        laserBeam.current.geometry.dispose()
                        laserBeam.current.material.dispose()
                        laserBeam.current = null
                    }
                }, 100)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [camera, world, rapier, scene])

    useFrame((state) => {
        if (!body.current) return

        const linvel = body.current.linvel()
        const frontVector = new THREE.Vector3(0, 0, 0)
        const sideVector = new THREE.Vector3(0, 0, 0)
        const direction = new THREE.Vector3(0, 0, 0)

        if (movement.forward) frontVector.set(0, 0, -1)
        if (movement.backward) frontVector.set(0, 0, 1)
        if (movement.left) sideVector.set(-1, 0, 0)
        if (movement.right) sideVector.set(1, 0, 0)

        const camEuler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ')
        camEuler.x = 0
        camEuler.z = 0

        direction
            .addVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camEuler)

        body.current.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true)

        const isMoving = movement.forward || movement.backward || movement.left || movement.right
        if (isMoving && state.clock.elapsedTime - lastFootstepTime.current > 0.35) {
            if (Math.abs(linvel.y) < 0.1) {
                SoundManager.playFootstepSound()
                lastFootstepTime.current = state.clock.elapsedTime
            }
        }

        if (movement.jump && Math.abs(linvel.y) < 0.1) {
            body.current.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true)
            SoundManager.playJumpSound()
        }

        const playerPos = body.current.translation()
        const offset = new THREE.Vector3(0, 1.5, 4)
        offset.applyQuaternion(camera.quaternion)
        camera.position.x = playerPos.x + offset.x
        camera.position.y = playerPos.y + offset.y
        camera.position.z = playerPos.z + offset.z

        const cameraDir = new THREE.Vector3(0, 0, -1)
        cameraDir.applyQuaternion(camera.quaternion)
        cameraDir.y = 0
        cameraDir.normalize()

        if (group.current) {
            const angle = Math.atan2(cameraDir.x, cameraDir.z)
            group.current.rotation.y = angle
        }
    })

    return (
        <RigidBody ref={body} colliders={false} enabledRotations={[false, false, false]} position={[0, 2, 0]} friction={0}>
            <CapsuleCollider args={[0.75, 0.5]} />
            <group ref={group}>
                <mesh position={[-0.25, -0.75, 0]} castShadow>
                    <capsuleGeometry args={[0.15, 1.2, 8, 16]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.3} />
                </mesh>
                <mesh position={[0.25, -0.75, 0]} castShadow>
                    <capsuleGeometry args={[0.15, 1.2, 8, 16]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.3} />
                </mesh>

                <mesh position={[0, 0.2, 0]} castShadow>
                    <cylinderGeometry args={[0.35, 0.3, 0.8, 16]} />
                    <meshStandardMaterial color="#050505" roughness={0.4} metalness={0.2} />
                </mesh>
                <mesh position={[0, 0.3, 0.25]} rotation={[0.1, 0, 0]}>
                    <boxGeometry args={[0.4, 0.3, 0.1]} />
                    <meshStandardMaterial color="#111" metalness={0.5} />
                </mesh>

                <group position={[0, 0.85, 0]}>
                    <mesh castShadow>
                        <sphereGeometry args={[0.22, 32, 32]} />
                        <meshStandardMaterial color="#080808" roughness={0.1} metalness={0.8} />
                    </mesh>
                    <mesh position={[0, 0.02, 0.15]} rotation={[0.1, 0, 0]}>
                        <sphereGeometry args={[0.16, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
                        <meshStandardMaterial color="#000" roughness={0} metalness={1} emissive="#111" />
                    </mesh>
                </group>

                <mesh position={[-0.45, 0.2, 0]} rotation={[0, 0, 0.2]} castShadow>
                    <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
                    <meshStandardMaterial color="#0a0a0a" />
                </mesh>
                <mesh position={[0.45, 0.2, 0]} rotation={[0, 0, -0.2]} castShadow>
                    <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
                    <meshStandardMaterial color="#0a0a0a" />
                </mesh>

                <group position={[-0.6, 0.1, 0.4]} rotation={[0, -0.3, 0]}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[0.05, 1.4, 0.8]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.6} />
                    </mesh>
                    <mesh position={[0, 0.4, 0]}>
                        <boxGeometry args={[0.06, 0.2, 0.4]} />
                        <meshPhysicalMaterial color="#88ccee" transmission={0.5} thickness={0.1} roughness={0} />
                    </mesh>
                    <mesh position={[0.03, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.2, 0.2, 0.01, 8]} />
                        <meshBasicMaterial color="red" />
                    </mesh>
                    <mesh position={[0.031, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
                        <meshBasicMaterial color="white" />
                    </mesh>
                </group>

                <Weapon position={[0.4, 0, 0.5]} muzzleRef={muzzleRef} />
            </group>
        </RigidBody>
    )
})

export default Player
