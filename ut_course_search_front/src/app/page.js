"use client"
import React, { useState, useEffect } from "react";
import useColorMode from '@/hooks/useColorMode'
import Image from 'next/image'
import { NavBar } from '@/components/NavBar';
import { Search } from '@/components/Search';
import { Detail } from '@/utils/Utils';
import Modal from "@/components/Modal";

export default function Home() {

  const [colorMode, setColorMode] = useColorMode();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white dark:bg-charcoal max-h-screen min-h-screen overflow-y-auto">
      <div className="flex items-start justify-start">
      <nav className="flex items-end justify-end flex-wrap w-screen">
            <div className="flex items-center mr-6">
                <button className="bg-burntOrange hover:bg-burntOrangeDark rounded inline-flex items-center mr-3"
                onClick={() => setShowModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 px-2">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                </button>
                <button 
                onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
                className="bg-charcoalDark hover:bg-charcoalLight rounded inline-flex items-center space-x-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 px-2">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                </button>
            </div>
        </nav>
      </div>
      <Detail.Container>
        <Detail.ContentContainer>
          <Search />
          <Modal onClose={() => setShowModal(false)} isVisible={showModal}/>
        </Detail.ContentContainer>
      </Detail.Container>
    </div>
  )
}
{/* <div className='bg-white dark:bg-charcoal w-screen h-screen flex justify-center items-center'>
      
</div>
<button onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
      className='bg-charcoal dark:bg-white text-white dark:text-charcoal'>
        Toggle Color Mode
</button>
<div className='text-charcoal dark:text-white font-roboto'>
  Hello World!
</div> */}