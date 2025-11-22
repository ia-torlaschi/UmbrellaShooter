import { Cylinder } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function ConcretePillar({ position, height = 4 }) {
    return (
        <RigidBody type="fixed" position={position} friction={0}>
            <group>
                {/* Main Concrete Shaft */}
                <mesh castShadow receiveShadow position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.8, 0.8, height, 16]} />
                    <meshStandardMaterial color="#555" roughness={0.9} metalness={0.1} />
                </mesh>

                {/* Hexagonal Base */}
                <mesh position={[0, -height / 2 + 0.25, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[1.2, 1.4, 0.5, 6]} />
                    <meshStandardMaterial color="#333" roughness={0.5} metalness={0.6} />
                </mesh>

                {/* Top Cap */}
                <mesh position={[0, height / 2 - 0.1, 0]} castShadow>
                    <cylinderGeometry args={[1, 0.8, 0.2, 16]} />
                    <meshStandardMaterial color="#333" roughness={0.5} metalness={0.6} />
                </mesh>

                {/* Metal Rings / Supports */}
                <mesh position={[0, 0, 0]}>
                    <torusGeometry args={[0.85, 0.05, 8, 32]} />
                    <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, height / 3, 0]}>
                    <torusGeometry args={[0.85, 0.05, 8, 32]} />
                    <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, -height / 3, 0]}>
                    <torusGeometry args={[0.85, 0.05, 8, 32]} />
                    <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Warning Stripes (Emissive) */}
                <mesh position={[0, height / 2 - 0.5, 0]}>
                    <cylinderGeometry args={[0.81, 0.81, 0.2, 16]} />
                    <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </RigidBody>
    )
}
