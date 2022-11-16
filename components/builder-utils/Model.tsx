/*
WHAT:
TODO:
*/

import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Suspense } from "react";
import { Light, MeshNormalMaterial } from "three";

const Scene = (props: any) => {
    const fbx = useLoader(FBXLoader, props.path);
    return <primitive 
      object={fbx}
      scale={props.scale}
      /> //TODO: scale field in Builder
  };


export default function Model ({ path, scale }:any) {

    return (
      
        <div className="relative flex w-full h-[400px] justify-center items-center lg:w-[600px] lg:h-[600px]">
          <div className="absolute h-full lg:-ml-[20%] w-full flex items-center justify-center">
          <Canvas>
          <Suspense fallback={null}>
              <Scene path={path} scale={scale}/>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate={true}/>
              <pointLight intensity={.4}></pointLight>
              <ambientLight intensity={.6}></ambientLight>
          </Suspense>
          </Canvas>
          </div>
          </div>       
    )
    
}