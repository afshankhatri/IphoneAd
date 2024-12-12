import React, { useEffect, useState } from "react"
import gsap from 'gsap'
import { useGSAP} from '@gsap/react'
import { heroVideo, smallHeroVideo } from "../utils"
import Highlights from "./Highlights"

function Hero() {
  useGSAP(()=>{
    gsap.to('#hero',{
      opacity:1,delay:1.5,ease: "power1.in",duration:1
    })

    gsap.to("#cta",{
      opacity:1,delay:3.3,ease: "power1.in",duration:1.5     
    })
  })

  const [srcVideo,setSrcVideo] = useState( window.innerWidth < 760 ? smallHeroVideo : heroVideo )

  const handelSizeOfDisplayIphone = () => { window.innerWidth < 760 ? setSrcVideo(smallHeroVideo) : setSrcVideo(heroVideo) }

  useEffect(()=>{
    window.addEventListener('resize',handelSizeOfDisplayIphone)
    return ()=>{ //whenever we use addeventlistner in the use effect we should make sure that we remove it as well
      window.removeEventListener('resize',handelSizeOfDisplayIphone)
    }
  },[])

  return (
    <section >
      <div className='h-screen w-screen flex justify-center items-center flex-col'>
        <p id="hero" className='hero-title'>Iphone 15 Pro Max</p>  {/* here if we dont put gsap then it will not get visible on the screen .... since in index.css we have defined such property the classnaMe is "hero-title" */}
        <div className="md:w-10/12 w-9/12">
          <video src={srcVideo} alt="horizontalIphoneDisplay" key={srcVideo} className="pointer-events-none" autoPlay muted playsInline={true} />
        </div>
        <div id="cta" className="flex flex-col justify-center items-center opacity-0">
          <a href={Highlights} className="btn cursor-pointer"> Order </a>
          <h1>$199/month or $999</h1>
        </div>
      </div>



    </section>
  )
}

export default Hero