import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import React, { useRef, useState } from 'react'
import ModleView from './ModleView'
import { yellowImg } from '../utils'
import * as THREE from "three"
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from '../constants'

function Model() {
    const [size, setsize] = useState("small")
    const [model,setmodel] = useState({
        title:"Ipone 15 Pro in Natural Titanium",
        color:["#7F7A81","#FFE7B9","#6F6C64"],
        img: yellowImg
    })

    // camera control for the model view
    const cameraControllSmall = useRef()
    const cameraControlLarge = useRef()

    //model 
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    //Rotation
    const [smallRotation, setsmallRotation] = useState(0)
    const [largeRotation, setlargeRotation] = useState(0)

    useGSAP(()=>{
        gsap.to("#heading",{ y:0,opacity:1})
    })
  return (
    <section className='common-padding'>
        <div  className='screen-max-width'>
            <h1 id='heading' className='section-heading'>
                Take a clooser Look
            </h1>

            <div className='flex flex-col items-center mt-5'>
                <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative' >
                    <ModleView
                        index = {1}
                        groupRef = {small}
                        gsapType = {"view1"}
                        controlRef = {cameraControllSmall}
                        size = {size}
                        item = {Model}
                    />
                    {/* <ModleView
                        index = {2}
                        groupRef = {large}
                        gsapType = {"view2"}
                        controlRef = {cameraControlLarge}
                        size = {size}
                        item = {Model}
                    /> */}

                    <Canvas
                        className='w-full h-full'
                        style={{
                            position:'fixed',
                            top:0,
                            bottom:0,
                            left:0,
                            right:0,
                            overflow:'hidden'
                        }}
                        eventSource= {document.getElementById('root')}
                    >
                         <View.Port/>  {/*view port is a way to render multiple model in same canvas*/}
                    </Canvas>
                </div>
                <div className='mx-auto w-full '>
                        <p className='text-[25px] font-light text-center mb-5'>{model.title}</p>
                        {/* <div className='flex-center'>
                            <ul className='color-container'>
                                {models.map((item,i)=>(
                                    <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                                    style={{
                                        backgroundColor:item.color[0]
                                    }}
                                    onClick={()=>setmodel(item)}
                                    >

                                    </li>
                                ))}
                            </ul>
                            <button className='size-btn-container'>
                                {sizes.map(({label,value})=>(
                                    <span key={label} className='size-btn'
                                    style={{backgroundColor:size===value?'white' :'transparent',
                                        color:size===value?'black':'white'
                                    }}
                                    onClick={()=>setsize(value)}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div> */}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Model

