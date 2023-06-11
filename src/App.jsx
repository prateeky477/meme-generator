import { useState, useRef } from "react";
import { Box, Image ,Center} from "@chakra-ui/react";
import Header from "./components/Header";
import Home from "./pages/Home";


const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
  };

  return (
    <div>
    <Header/>
    <Home/>
    </div>
  );
};

export default App;
