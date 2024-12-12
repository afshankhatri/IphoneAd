import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import * as THREE from "three"
import React, { Suspense } from 'react'
import Lights from './Lights.jsx'
import IPhone from './IPhone.jsx'  //i had not put .jsx here ....it was not importing that file ...but in other files i did it directly without .jsx it accepted .... so it might happen sometimes that because of .jsx it does not import and code gives error or the code does not work


function ModleView({index,groupRef,gsapType,controlRef,setRotationState,size,item}) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`border-2-500 w-full h-full ${index ===2}? 'right-[-100%] : ""`}
    >
      {/* ambient light  */}
      <ambientLight intensity={0.3}/>

      <PerspectiveCamera makeDefault position={[0,0,4]}/>
      <Lights/>

      {/* orbitcontrols allows the 3d model to roll around   */}
      <OrbitControls 
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0,0,0)}
        onEnd={()=>setRotationState(controlRef.current.getAzimuthalAngle())}
      />


    <group ref={groupRef} name={`${index === 1} ? 'small' : 'large' `} position={[0,0,0]}>
      <Suspense fallback={<Html><div>Loading</div></Html>}>   {/*this will show loading message when the mdoel is being rendered*/}
        <IPhone
          scale={index === 1 ? [15,15,15] : [17,17,17]}
          item = {item}
          size = {size}
        />
      </Suspense>
    </group>
    </View>
  )
}

export default ModleView