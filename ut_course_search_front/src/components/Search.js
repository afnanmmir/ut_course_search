"use client"
import useColorMode from '@/hooks/useColorMode'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { ResponseCard, LoadingCard, CourseCard, SectionContainer } from '@/utils/Utils';
import queryIndex, {ResponseSources, QueryResponse, queryChat} from '@/api/queryIndex'

export function Search(){
    const {theme, setTheme} = useTheme();
    const [colorMode, setColorMode] = useColorMode();
    const [search, setSearch] = useState('');
    const [chatAnswer, setChatAnswer] = useState('');
    const [answered, setAnswered] = useState(false);
    const [courseAnswered, setCourseAnswered] = useState(false);
    const [sources, setSources] = useState(null);
    const [currentSearch, setCurrentSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log("I have been submitted");
        setCourseAnswered(false);
        setChatAnswer('');
        setAnswered(false);
        setLoading(true);
        setCurrentSearch(search);
        console.log(search);
        queryIndex(search).then((response) => {
            setLoading(false);
            setSources(response.response)
            setCourseAnswered(true);
            setShowButton(true);
        })
    }

    const onButtonSubmit = (e) => {
        e.preventDefault();
        console.log("I have been pushed");
        setShowButton(false);
        setLoading(true);
        queryChat(currentSearch).then((response) => {
            setLoading(false);
            setAnswered(true);
            setChatAnswer(response.text);
        })
    }

    const button = () => {
        return (
            <button className='bg-burntOrange text-white font-bold py-2 px-4 rounded' onClick={onButtonSubmit}>
                <div className='flex flex-row'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 pr-2">
                        <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 00-.266.112L8.78 21.53A.75.75 0 017.5 21v-3.955a48.842 48.842 0 01-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clip-rule="evenodd" />
                    </svg>
                Get Chat
                </div>
            </button>
        )
    }

    return (
        <div className='flex justify-center items-center'>
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
                {showButton === true ? button() : null}
                {loading === true ? <LoadingCard /> : null}
                {answered === true ? <ResponseCard query={currentSearch} answer={chatAnswer} /> : null}
                {courseAnswered === true ? sources.map((source, index) => (
                    <SectionContainer key={index}>
                        <CourseCard course={source} key={index} />
                    </SectionContainer>
                )) : null}
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