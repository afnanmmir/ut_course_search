"use client"
import useColorMode from '@/hooks/useColorMode'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useState, useEffect } from "react";

export function Search(){
    const {theme, setTheme} = useTheme();
    const [colorMode, setColorMode] = useColorMode();
    const [search, setSearch] = useState('');

    const onFormSubmit = (e) => {
        console.log("I am here");
        e.preventDefault();
    }

    return (
        <div className='flex h-screen w-screen justify-center items-center'>
            <div className='flex flex-col justify-center items-center pb-56'>
                <h2 className='text-4xl font-bold text-charcoal dark:text-white'>UT Course Search</h2>
                <form className='flex flex-col justify-center items-center pt-5' onSubmit={onFormSubmit}>
                    <input 
                        className='border-2 
                        border-charcoal 
                        dark:border-black
                        text-black 
                        rounded-md 
                        p-2 m-2' 
                        type='text'
                        value={search} 
                        placeholder='Search for a course'
                        onChange={e => setSearch(e.target.value)} 
                        />
                </form>
            </div>
        </div>
    )
}

{/* <button onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
      className='bg-charcoal dark:bg-white text-white dark:text-charcoal'>
        Toggle Color Mode
</button>
<div className='text-charcoal dark:text-white font-roboto'>
  Hello World!
</div> */}