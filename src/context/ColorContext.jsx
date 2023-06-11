import React, { useState, useEffect, createContext } from "react";

export const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const [isBlack, setIsBlack] = useState(false);
  const [isWhite, setIsWhite] = useState(false);
  return (
    <ColorContext.Provider value={{ isBlack, setIsBlack ,isWhite,setIsWhite}}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
