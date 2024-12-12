import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCoursel from './VideoCoursel'


function Highlights() {

  useGSAP(()=>{
    gsap.to("#title",{
      opacity:1,y:0
    })

    gsap.to(".link",{
      opacity:1,y:0,stagger:0.25
    },[])
  })
  return (
    <section id='highlights' className='w-screen overflow-hidden h-full common-padding bg-zinc'>
      <div className='screen-max-width'>
        <div className=' mb-12 w-full md:flex items-end justify-between  bg-zinc'>
          <h1 id='title' className='section-heading'>Get the Highlights</h1>
          <div className='flex flex-wrap items-end gap-5'>
            <p className=' link'>Watch the Film <img src={watchImg} alt="images"  className='ml-2'/> </p>
            <p className='link'>Watch the Event  <img src={rightImg} alt="images" className='ml-2'/></p>
          </div>
        </div>
        <VideoCoursel/>
      </div>
    </section>
  )
}

export default Highlights