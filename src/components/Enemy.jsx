import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import SoundManager from '../utils/SoundManager'

export default function Enemy({ position = [0, 1, 0], playerRef }) {
    const body = useRef()
    const [dead, setDead] = useState(false)

    useFrame(() => {
        if (dead || !body.current || !playerRef?.current) return

        const enemyPos = body.current.translation()
        const playerPos = playerRef.current.translation()

        const direction = new THREE.Vector3()
            .subVectors(playerPos, enemyPos)
            .normalize()
            .multiplyScalar(2) // Speed

        body.current.setLinvel({ x: direction.x, y: -1, z: direction.z }, true)
    })

    const handleHit = () => {
        setDead(true)
        SoundManager.playImpactSound()
    }

    if (dead) return null

    return (
        <RigidBody
            ref={body}
            position={position}
            lockRotations
            userData={{ type: 'enemy', hit: handleHit }}
        >
            <mesh castShadow onClick={handleHit}>
                <boxGeometry args={[1, 2, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    )
}
