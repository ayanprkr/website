import * as THREE from 'three'
import type { NextPage } from "next";
import { useEffect, useRef, useState, useMemo, type FC, ReactElement } from 'react'
import { Canvas, useFrame, useThree, ThreeElements } from '@react-three/fiber'
import { OrbitControls, useCursor } from '@react-three/drei'
import { AsciiEffect } from 'three-stdlib'

const Torusknot = (props: ThreeElements['mesh']) => {
    const ref = useRef<THREE.Mesh>(null!);

    const [clicked, click] = useState(false);
    const [hovered, hover] = useState(false);
   
    useCursor(hovered);
    useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta / 2));
   
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1.25}
            onClick={() => click(!clicked)}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}>
            <torusKnotGeometry args={[1, 0.2, 128, 32]} />
            <meshStandardMaterial color="white" />
        </mesh>
    )
}

const AsciiRenderer: any = ({ renderIndex = 1, characters = ' .:-+*=%@#', ...options }) => {

    const { size, gl, scene, camera } = useThree()

    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characters, options)
        effect.domElement.style.position = 'absolute'
        effect.domElement.style.zIndex = '0'
        effect.domElement.style.top = '0px'
        effect.domElement.style.left = '0px'
        effect.domElement.style.color = 'white'
        effect.domElement.style.backgroundColor = 'black'
        effect.domElement.style.pointerEvents = 'none'
        return effect
    }, [characters, options.invert]);

    useEffect(() => {
        gl?.domElement?.parentNode?.appendChild(effect.domElement);
        return (() => {
            gl?.domElement?.parentNode?.removeChild(effect.domElement)
        }) 
    }, [effect]);

    useEffect(() => {
        effect.setSize(size.width, size.height)
    }, [effect, size]);

    useFrame((state) => {
        effect.render(scene, camera)
    }, renderIndex);

}

const CanvasPage: NextPage = () => {
    return (
        <>
            <div className="py-10 md:py-20 h-screen w-full rounded-lg">
                <Canvas
                    flat linear
                >
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Torusknot />
                    <OrbitControls />
                    <AsciiRenderer invert />
                </Canvas>
            </div>
        </>
    )
}

export default CanvasPage;