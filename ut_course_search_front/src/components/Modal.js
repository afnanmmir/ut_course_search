"use client"
import * as React from 'react'

const Modal = ({isVisible, onClose}) => {
    if (!isVisible) {
        return null;
    }

    const handleClose = (e) => {
        e.preventDefault();
        if(e.target.id === 'wrapper'){
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" id='wrapper' onClick={handleClose}>
            <div className="w-[600px] flex flex-col">
                <div className="bg-white dark:bg-charcoalDark p-3 rounded-xl">
                    <header className='text-charcoalDark dark:text-white text-2xl font-bold p-2'>UT Courses Search</header>
                    <p className='text-charcoalDark dark:text-white p-3'>Welcome to UT Course Search!</p>
                    <p className='text-charcoalDark dark:text-white p-3'>Examples of use cases: 
                    <br/>
                    <br/>
                    - ``I want to take a class on Machine Learning``
                    <br/>
                    <br/>
                    - ``I want to learn more about photography``
                    <br/>
                    <br/>
                    - ``Can you compare and contrast ECE461P (Data Science Principles) and ECE461J (Data Science Lab)?``
                    <br/>
                    <br/>
                    - ``I want to become a better public speaker``
                    <br/>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Modal