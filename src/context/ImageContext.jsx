import React, { createContext,useState } from 'react'

export const ImgContext = createContext();

const ImgProvider = ({ children }) => {
    const [selectedImage, setSelectedImage] = useState('')
    return <ImgContext.Provider value={{selectedImage,setSelectedImage}}>{children}</ImgContext.Provider>
}


export default ImgProvider
