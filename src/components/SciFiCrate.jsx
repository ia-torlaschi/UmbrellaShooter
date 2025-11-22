import { Box, RoundedBox } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function SciFiCrate({ position, rotation = [0, 0, 0], scale = 1 }) {
    return (
        <RigidBody type="fixed" position={position} rotation={rotation} friction={0}>
            <group scale={scale}>
                {/* Core Container */}
                <RoundedBox args={[2, 2, 2]} radius={0.05} smoothness={4} castShadow receiveShadow>
                    <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
                </RoundedBox>

                {/* Reinforced Corners */}
                {[
                    [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
                    [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
                ].map((pos, i) => (
                    <mesh key={i} position={pos} castShadow>
                        <boxGeometry args={[0.4, 0.4, 0.4]} />
                        <meshStandardMaterial color="#444" roughness={0.2} metalness={0.9} />
                    </mesh>
                ))}

                {/* Glowing Status Light */}
                <mesh position={[0, 0, 1.01]}>
                    <planeGeometry args={[0.5, 0.1]} />
                    <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} toneMapped={false} />
                </mesh>

                {/* Indented Panels (Visual detail) */}
                <mesh position={[0, 0, 1.05]} receiveShadow>
                    <boxGeometry args={[1.6, 1.6, 0.05]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
                </mesh>
                <mesh position={[0, 0, -1.05]} receiveShadow>
                    <boxGeometry args={[1.6, 1.6, 0.05]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
                </mesh>
                <mesh position={[1.05, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                    <boxGeometry args={[1.6, 1.6, 0.05]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
                </mesh>
                <mesh position={[-1.05, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                    <boxGeometry args={[1.6, 1.6, 0.05]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
                </mesh>

                {/* Umbrella Logo Decal (Simplified) */}
                <mesh position={[0, 0.5, 1.08]}>
                    <circleGeometry args={[0.2, 32]} />
                    <meshBasicMaterial color="red" />
                </mesh>
                <mesh position={[0, 0.5, 1.09]}>
                    <circleGeometry args={[0.1, 32]} />
                    <meshBasicMaterial color="white" />
                </mesh>

            </group>
        </RigidBody>
    )
}
