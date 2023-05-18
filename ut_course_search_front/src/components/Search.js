"use client"
import useColorMode from '@/hooks/useColorMode'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { ResponseCard, LoadingCard } from '@/utils/Utils';
import { data } from '@/test_data/data';
import queryIndex, {ResponseSources, QueryResponse} from '@/api/queryIndex'

export function Search(){
    const {theme, setTheme} = useTheme();
    const [colorMode, setColorMode] = useColorMode();
    const [search, setSearch] = useState('');
    const [answered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState('');
    const [sources, setSources] = useState([]);
    const [currentSearch, setCurrentSearch] = useState('');
    const [loading, setLoading] = useState(false);
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log("I have been submitted");
        setAnswered(true);
        setLoading(true);
        setCurrentSearch(search);
        queryIndex(search).then((response) => {
            setLoading(false);
            setAnswer(response.text)
            setSources(response.sources)
        })
    }

    return (
        <div className='flex h-screen justify-center items-center'>
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
                {/* <div className='flex flex-col justify-center items-center'>
                    {answered === true ? <ResponseCard query={currentSearch} answer={answer} /> : null}
                </div> */}
                <div className='flex flex-col justify-center items-center p-4'>
                    {loading === true && answered === true ? <LoadingCard /> : answered === true ? <ResponseCard query={currentSearch} answer={answer}/> : null}
                </div>
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