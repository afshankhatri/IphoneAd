import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react'
import { pauseImg, playImg, replayImg } from '../utils'

function VideoCoursel() {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video,setVideo] = useState({
        isEnd : false,
        StartPlay :false,
        VideoID: 0,
        isLastVideo: false,
        isPlaying : false
    })

    const {isEnd,isPlaying,isLastVideo,StartPlay,VideoID} = video

    useGSAP(()=>{

        gsap.to("#slider",{
            transform:`translateX(${-100 * VideoID}%)`,
            duration:2,
            ease:'power2.inOut'
        })

        gsap.to("#video",{
            scrollTrigger:{
                trigger:"#video",
                toggleActions:"restart none none none"
            },
            onComplete:() =>{
                setVideo((pre)=>({
                    ...pre,
                    StartPlay:true,
                    isPlaying:true 
                }))
            }
        })
    },[isEnd,VideoID])


    const [loadedData, setloadedData] = useState([])

    // this useEffect deals with progress of the video when it is running
    useEffect(()=>{
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[VideoID].pause()
            }
            else{
                StartPlay && videoRef.current[VideoID].play()
            }
        }
    },[StartPlay,VideoID,isPlaying,loadedData])

    const handleLoadedMetaData = (i,e) =>setloadedData((pre) => [...pre,e])


    //this useEffect deals with changing of the video after completion of video
    useEffect(()=>{
        let currentProgress = 0 
        let span = videoSpanRef.current
        // to animate progress of the video 
        if (span[VideoID]) {
            let animationStart = gsap.to(span[VideoID],{
                onUpdate:()=>{
                    const progress = Math.ceil(animationStart.progress() * 100)  //this animationStart.progress is the direct build in funct. in the gsap which allows us to see the progress of the video
                    if (progress !=currentProgress) {
                        currentProgress = progress

                        gsap.to(videoDivRef.current[VideoID],{
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' :"4vw"
                        })
                        gsap.to(span[VideoID],{
                            width:`${currentProgress}%`,
                            backgroundColor:'white'
                        })
                    }
                },
                onComplete:()=>{
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[VideoID],{
                            width:'12px'
                        })
                        gsap.to(span[VideoID],{
                            backgroundColor:'#afafaf'
                        })
                    }
                },
            })
            if (VideoID == 0 ) {
                animationStart.restart()
            }   

            const animUpdate = ()=>{
                animationStart.progress(videoRef.current[VideoID].currentTime / hightlightsSlides[VideoID].videoDuration)
            }
            if (isPlaying) {
                gsap.ticker.add(animUpdate)
            }else{
                gsap.ticker.remove(animUpdate)
            }
        }
    },[VideoID, StartPlay])

    const handleProcess = (type,i) => {
        switch (type) {
            case 'video-end':
                setVideo((pre) =>({...pre, isEnd:true, VideoID: i+1 }))
                break;
            case 'video-last':
                setVideo((pre) => ({...pre, isLastVideo:true}))
                break;
            case 'video-reset':
                setVideo((pre) => ({...pre, isLastVideo:false, VideoID:0}))
                break;
            case 'play':
                setVideo((pre) => ({...pre, isPlaying :!pre.isPlaying}))
                break;
            case 'pause':
                setVideo((pre) => ({...pre, isPlaying :!pre.isPlaying})) //(debugging b/w play and pause)
                break;
            default:
                break;
        }
    }

  return (
    <> 
        <div className='flex items-center'>
            {hightlightsSlides.map((list,i)=>(
                <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                    <div className='video-carousel_container'>
                        <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                            <video 
                            src={list.video} 
                            id='video' 
                            className={`${list.id === 2 && 'translate-x-44'}pointer-events-none`}                            muted playsInline={true} preload='auto' autoPlay
                            ref={(el)=>(videoRef.current[i] = el)}
                            onPlay={()=>{
                                setVideo((prevVideo)=>({
                                    ...prevVideo,isPlaying:true
                                }))
                            }}
                            onLoadedMetadata={(e) => handleLoadedMetaData(i,e)} 
                            onEnded={()=>{
                                i!==3 ? handleProcess('video-end', i) : handleProcess('video-last')
                            }}
                            ></video>
                        </div>
                        <div className='absolute top-12 left-[5%] z-10'>   {/*yaha jo css lagi hai wo imp hai*/}
                            {list.textLists.map((text)=>(
                                <p className='md:text-2xl text-xl font-medium'>
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className='relative flex-center mt-10'>
            <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                {videoRef.current.map((_,i)=>(
                    <span key={i} className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer" ref={(el)=>(videoDivRef.current[i] = el)}>
                        <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)}/>
                    </span>
                ))}
            </div>
            <button className='control-btn'>
                <img 
                src={isLastVideo ? replayImg : !isPlaying ? playImg :pauseImg} 
                alt="pause/play icon"
                onClick={isLastVideo ? () => handleProcess("video-reset") : !isPlaying ? () => handleProcess("play") : ()=> handleProcess("pause")} />   {/* this will help us to pause paly and repeat the videos*/}
                
            </button>
        </div>
    </>
  )
}

export default VideoCoursel