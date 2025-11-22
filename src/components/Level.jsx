import { RigidBody } from '@react-three/rapier'
import { Text, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'
import SciFiCrate from './SciFiCrate'
import ConcretePillar from './ConcretePillar'

export default function Level() {
    return (
        <>
            {/* Floor - HD Reflective */}
            <RigidBody type="fixed" friction={1}>
                <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2} scale={100}>
                    <planeGeometry />
                    <MeshReflectorMaterial
                        blur={[300, 100]}
                        resolution={2048}
                        mixBlur={1}
                        mixStrength={40}
                        roughness={1}
                        depthScale={1.2}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.4}
                        color="#101010"
                        metalness={0.5}
                    />
                </mesh>
                {/* Grid Overlay for "Sci-Fi" look */}
                <gridHelper args={[100, 50, 0x444444, 0x222222]} position={[0, -0.99, 0]} />
            </RigidBody>

            {/* Branding */}
            <Text
                position={[0, 0.1, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={5}
                color="red"
                anchorX="center"
                anchorY="middle"
            >
                UMBRELLA CORP
            </Text>

            {/* --- OBSTACLES --- */}

            {/* Right Side Pillars */}
            <ConcretePillar position={[5, 2, 5]} height={4} />
            <ConcretePillar position={[10, 2, 5]} height={4} />

            {/* Left Side Pillars */}
            <ConcretePillar position={[-5, 2, -5]} height={4} />
            <ConcretePillar position={[-10, 2, -5]} height={4} />

            {/* Central Cover (Crates) */}
            <SciFiCrate position={[2, 1, 8]} rotation={[0, 0.5, 0]} />
            <SciFiCrate position={[-3, 1, 6]} rotation={[0, -0.2, 0]} />

            {/* Stacked Crates (Climbable) */}
            <SciFiCrate position={[-8, 1, 0]} />
            <SciFiCrate position={[-8, 2, 0]} /> {/* Stacked */}
            <SciFiCrate position={[-10.5, 1, 0]} /> {/* Step */}

            {/* Large Wall / Bunker Entrance */}
            <RigidBody type="fixed" position={[0, 3, -15]} friction={0}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[40, 6, 2]} />
                    <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
                </mesh>
                {/* Entrance Gate */}
                <mesh position={[0, -1, 1.1]}>
                    <planeGeometry args={[8, 4]} />
                    <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
                </mesh>
                <Text position={[0, 2, 1.1]} fontSize={2} color="red">
                    SECTOR 4
                </Text>
            </RigidBody>

            {/* Side Walls to enclose area */}
            <RigidBody type="fixed" position={[20, 3, 0]} rotation={[0, -Math.PI / 2, 0]} friction={0}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[40, 6, 2]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[-20, 3, 0]} rotation={[0, Math.PI / 2, 0]} friction={0}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[40, 6, 2]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, 3, 20]} friction={0}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[40, 6, 2]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
                </mesh>
            </RigidBody>

            {/* Extra Props for Detail */}
            <SciFiCrate position={[15, 1, -10]} rotation={[0, 0.3, 0]} />
            <SciFiCrate position={[16, 1, -8]} rotation={[0, -0.5, 0]} />
            <SciFiCrate position={[15.5, 2, -9]} />

            <ConcretePillar position={[-15, 2, 10]} height={4} />
            <ConcretePillar position={[-15, 2, 5]} height={4} />
        </>
    )
}
