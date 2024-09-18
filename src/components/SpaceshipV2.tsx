import * as THREE from 'three';
import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
  }
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial
    PaletteMaterial002: THREE.MeshStandardMaterial
    PaletteMaterial003: THREE.MeshStandardMaterial
  }
}

interface SpaceshipProps {
  props?: JSX.IntrinsicElements['group'];
  onLoad: () => void;
}

const SpaceshipV2: React.FC<SpaceshipProps> = ({ props, onLoad }) => {
  const gltf  = useGLTF('/scifi-hallway-edited-2-transformed-compressedV2.glb') as GLTFResult;
  const { nodes, materials } = gltf;

  useEffect(() => {
    if (gltf) {
      onLoad();
    }
  }, [gltf, onLoad]);

  return (
    <group {...props} dispose={null}>
      <pointLight intensity={10} decay={1.5} color="#65bcfc" position={[0, 2, 2.333]} />
      <pointLight intensity={10} decay={1.5} color="#65bcfc" position={[0, 2, 8.677]} />
      <pointLight intensity={10} decay={1.5} color="#65bcfc" position={[0, 2, 14.677]} />
      <pointLight intensity={10} decay={1.5} color="#6fcafc" position={[0, 2, 20.667]} />
      <mesh geometry={nodes.Object_4.geometry} material={materials.PaletteMaterial001} position={[0, -2.25, 26.565]} rotation={[0, Math.PI / 2, 0]} />
      <mesh geometry={nodes.Object_5.geometry} material={materials.PaletteMaterial002} position={[0, -2.25, 26.565]} rotation={[0, Math.PI / 2, 0]} />
      <mesh geometry={nodes.Object_6.geometry} material={materials.PaletteMaterial003} position={[0, -2.25, 26.565]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  )
}

export default SpaceshipV2;

useGLTF.preload('/scifi-hallway-edited-2-transformed-compressedV2.glb')
