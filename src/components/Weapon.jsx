import { useRef } from 'react'

export default function Weapon({ muzzleRef, ...props }) {
    return (
        <group {...props}>
            {/* Gun Body */}
            <mesh position={[0, 0, 0.2]} castShadow>
                <boxGeometry args={[0.1, 0.1, 0.6]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* Handle */}
            <mesh position={[0, -0.1, 0]} rotation={[0.2, 0, 0]} castShadow>
                <boxGeometry args={[0.08, 0.2, 0.1]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Barrel Tip */}
            <mesh ref={muzzleRef} position={[0, 0, 0.55]}>
                <boxGeometry args={[0.08, 0.08, 0.1]} />
                <meshStandardMaterial color="#000" />
            </mesh>
        </group>
    )
}
