"use client"
import useLocalStorage from "./useLocalStorage";
import { useState, useEffect } from "react";

const useColorMode = () => {
    const [colorMode, setColorMode] = useLocalStorage("color-mode", "light");

    useEffect(() => {
        const className = 'dark';
        const element = window.document.body.classList;

        colorMode === 'dark' ? element.add(className) : element.remove(className);
    }, [colorMode]);

    return [colorMode, setColorMode];
}

export default useColorMode;