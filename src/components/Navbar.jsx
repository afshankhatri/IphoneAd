import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'

function Navbar() {
  return (
    <header>
        <nav className='w-scren h-fit p-10 flex justify-evenly items-center text-gray-100 '>
            <img src={appleImg} alt="appleLOGO" />
            <div className='flex items-center gap-[150px] hidden sm:flex'>
                {navLists.map((navAttributes)=>(
                    <div key={navAttributes} className='h-[20px] w-[20px] cursor-pointer hover:text-white'>
                        {navAttributes}
                    </div>
                ))}
            </div>
            <div className='flex items-center gap-[60px] cursor-pointer hover:text-white '>
                <img src={searchImg} alt="Search Icon" className='h-[20px] w-[20px] cursor-pointer '/>
                <img src={bagImg} alt="Shopping bag/cart" className='h-[20px] w-[20px] cursor-pointer '/>
            </div>
        </nav>
    </header>
  )
}

export default Navbar