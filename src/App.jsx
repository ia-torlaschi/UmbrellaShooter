import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { Physics } from '@react-three/rapier'
import { Environment, PointerLockControls, Sky, Stars, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing'
import Level from './components/Level'
import Player from './components/Player'
import Enemy from './components/Enemy'
import UI from './components/UI'

function App() {
    const playerRef = useRef()

    return (
        <>
            <Canvas
                shadows
                camera={{ position: [0, 5, 10], fov: 50 }}
                style={{ background: '#050505' }}
            >
                <Suspense fallback={null}>
                    {/* Atmosphere */}
                    <Sky sunPosition={[100, 10, 100]} turbidity={10} rayleigh={2} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <fog attach="fog" args={['#101010', 5, 30]} />
                    <Sparkles count={200} scale={[20, 20, 20]} size={4} speed={0.4} opacity={0.5} color="#88ccee" />

                    {/* Lighting */}
                    <ambientLight intensity={0.2} />
                    <directionalLight
                        castShadow
                        position={[10, 20, 5]}
                        intensity={2}
                        shadow-mapSize={[2048, 2048]}
                        shadow-bias={-0.0001}
                    />
                    <pointLight position={[-5, 5, -5]} intensity={1} color="red" distance={10} />

                    <Physics>
                        <Level />
                        <Player ref={playerRef} />
                        <Enemy position={[5, 1, 5]} playerRef={playerRef} />
                        <Enemy position={[-5, 1, 5]} playerRef={playerRef} />
                        <Enemy position={[0, 1, 15]} playerRef={playerRef} />
                    </Physics>

                    <PointerLockControls />
                    <Environment preset="night" />

                    {/* Post Processing */}
                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        <Noise opacity={0.05} />
                        <ChromaticAberration offset={[0.002, 0.002]} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
            <UI />
        </>
    )
}

export default App
