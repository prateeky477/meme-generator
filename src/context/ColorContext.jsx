import React, { useState, useEffect, createContext } from "react";

export const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState([
    { name: 'Black', code: 'black' },
    { name: 'White', code: 'white' },
    { name: 'Red', code: 'red' },
    { name: 'Blue', code: 'blue' },
    { name: 'White', code: 'white' },
    { name: 'Gray', code: 'gray' },
    
    // Add more colors as needed
  ]);

  const [selectedColor, setSelectedColor] = useState(colors[0].code);

  return (
    <ColorContext.Provider value={{ colors, selectedColor, setSelectedColor }}>
      {children}
    </ColorContext.Provider>
  );
};


export default ColorProvider;



