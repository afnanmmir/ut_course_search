import Link from 'next/link';
import * as React from 'react'

export function ResponseCard({query, answer}){
    return (
        <div className='p-4 border border-charcoal dark:border-burntOrange rounded-md whitespace-pre-wrap'>
            <p className='text-charcoal dark:text-white font-bold p-1 text-lg py-1'>{query}</p>
            <hr className="w-full border-gray-500 border-solid border-t p-1"></hr>
            <p className='text-charcoal dark:text-white p-1'>{answer}</p>
        </div>
    )
}

export function LoadingCard(){
  return(
    <div role="status" className="max-w-full animate-pulse border border-charcoal dark:border-burntOrange rounded-md p-4">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-[42rem] mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[42rem] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 "></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

const Container = React.forwardRef(
    (props, ref) => {
      return (
        <div
          ref={ref}
          id="main"
          className="relative flex max-h-screen w-full flex-col overflow-y-auto"
          {...props}
        />
      )
    }
  )
  Container.displayName = "Container";
  
  function ContentContainer(props) {
    return (
      <div
        className="mx-auto w-full max-w-3xl px-4 pb-32 md:px-8 md:pt-2"
        {...props}
      />
    )
  }
  
  export const Detail = {
      Container,
      ContentContainer,
  }