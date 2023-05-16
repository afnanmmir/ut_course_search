"use client"
import useColorMode from '@/hooks/useColorMode'
import Image from 'next/image'
import { NavBar } from '@/components/NavBar';
import { Search } from '@/components/Search';
import { Detail } from '@/utils/Utils';

export default function Home() {

  const [colorMode, setColorMode] = useColorMode();
  return (
    <div className="bg-white dark:bg-charcoal h-screen">
      <div className="flex items-start justify-start">
            <NavBar />
      </div>
      <Detail.Container>
        <Detail.ContentContainer>
          <Search />
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