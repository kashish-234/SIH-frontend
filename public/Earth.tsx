import * as THREE from 'three';
import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { AnimationAction, Group } from 'three'; // Ensure Group is imported

type GLTFAction = AnimationAction; // Define GLTFAction as AnimationAction

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
  };
  materials: {
    ['8k_earth_daymap']: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

// Use React.forwardRef to forward the ref to the group
export const Model = forwardRef<Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/earth.gltf') as GLTFResult;
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials['8k_earth_daymap']} scale={1.128} />
    </group>
  );
});

useGLTF.preload('/earth.gltf');
