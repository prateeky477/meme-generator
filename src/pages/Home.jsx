import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Text,
  Box,
  Button,
  Heading,
  VStack,
  Checkbox,
  Flex,
  FormLabel,
  useBreakpointValue,
} from "@chakra-ui/react";
import { fabric } from "fabric";
import html2canvas from "html2canvas";
import { ColorContext } from "../context/ColorContext";
import { useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ImgContext } from "../context/imageContext";

const Home = () => {
  const [fileName, setFileName] = useState(null);
  const Image = useContext(ImgContext);
  const Color = useContext(ColorContext);
  const fileInputRef = useRef(null);
  const [textElements, setTextElements] = useState([]);
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const imageContainerRef = useRef(null);
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const [showImageBtnDisabled, setShowImageBtnDisabled] = useState(false);
  const [fileGenerated, setFileGenerted] = useState()
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const[ urll,setUrll]=useState("")

  const handleBlackChange = () => {
    Color.setIsBlack(!Color.isBlack);
    Color.setIsWhite(false);
  };

  const handleWhiteChange = () => {
    Color.setIsWhite(!Color.isWhite);
    Color.setIsBlack(false);
  };

  const handleTextAdd = () => {
    if (canvas) {
      const newText = new fabric.Textbox("New Text", {
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        fontSize: 30,
        borderColor: "black",
        cornerColor: "black",
        cornerSize: 6,
        transparentCorners: false,
        fontFamily: "Impact",
        fill: Color.isBlack ? "black" : "white", // Set the text color based on the selected option
      });
      canvas.add(newText);
      canvas.setActiveObject(newText);
      canvas.renderAll();
    }
  };

  const initializeFabric = () => {
    const newCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(newCanvas);
    setShowImageBtnDisabled(true);
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file)
    setFileName(file.name);
    Image.setSelectedImage(URL.createObjectURL(file));
    // console.log(Image.selectedImage)
  };
  const handleSave = async () => {
    const element = document.getElementById("img");
    const formData = new FormData();
  
    html2canvas(element).then((canvas) => {
      // Convert the canvas to a Blob (image file)
      canvas.toBlob((blob) => {
        // Create a new File object from the Blob
        const imageFile = new File([blob], 'image.png', { type: 'image/png' });
  
        // Append the image file to the FormData
        formData.append('image', imageFile);
  
        const sendImageFile = async () => {
          try {
            setIsLoading(true);
            const response = await axios.post(import.meta.env.VITE_REACT_APP_URL+'/save', formData,{
              withCredentials: true,
            }, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              
            });
  
            console.log('Image uploaded successfully:');
          } catch (error) {
            console.error('Error uploading image:', error);
          } finally {
            setIsLoading(false);
          }
        };
  
        sendImageFile();
      }, 'image/png');
    });
  };
  


  const handleDownload = async () => {
    const element = document.getElementById("img");
    html2canvas(element).then((canvas) => {
      const imageDataURL = canvas.toDataURL("image/png");

      // Now you can use imageDataURL as needed
      // console.log(imageDataURL);

      // If you still want to trigger the download
      const link = document.createElement("a");
      link.href = imageDataURL;
      link.download = `${fileName}_meme.png`;
      link.click();
    });
  };

  useEffect(() => {
    if (Image.selectedImage.s3_url){
    setUrll(Image.selectedImage.s3_url)
    }
    else{
      setUrll(Image.selectedImage)
    }
    // console.log(Image.selectedImage)
    if (canvas && Image.selectedImage) {
      fabric.Image.fromURL(
        urll,  
        (img) => {
          const canvasWidth = canvas.getWidth();
          const canvasHeight = canvas.getHeight();
          const imgWidth = img.width;
          const imgHeight = img.height;

          const scale = Math.min(
            canvasWidth / imgWidth,
            canvasHeight / imgHeight
          );
          const left = (canvasWidth - imgWidth * scale) / 2;
          const top = (canvasHeight - imgHeight * scale) / 2;

          img.set({
            left: left,
            top: top,
            scaleX: scale,
            scaleY: scale,
          });

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        },
        {
          crossOrigin: "anonymous",
        }
      );
    }
  }, [canvas, Image.selectedImage]);

  const canvasHeight = useBreakpointValue({ base: 300, md: 600 });
  const canvasWidth = useBreakpointValue({ base: 350, md: 800 });

  return (
    <div style={{ backgroundColor: "white" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        spacing={8}
      >
        {!Image.selectedImage && (
          <>
            <Heading
              as="h1"
              fontSize="4xl"
              mb={4}
              fontFamily="Helvetica"
              p={1}
            >
              Meme generator
            </Heading>

            <Text noOfLines={2} fontFamily="Helvetica" p={2}>
              Create a meme from JPG, PNG images. Edit your image and make a
              meme.
            </Text>

            <Button
              m={4}
              colorScheme="twitter"
              onClick={handleImageUpload}
              fontFamily="Helvetica"
              fontSize={["md", "2xl"]}
              p={10}
              borderRadius="lg"
            >
              Upload Image
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Link to={'/template'}>
            <Button
              m={4}
              colorScheme="linkedin"
              fontFamily="Helvetica"
              fontSize={["md", "2xl"]}
              p={10}
              borderRadius="lg"
            >
              Choose From Template
              </Button>
            </Link>
            
          </>
        )}

        <Box display="flex" flexDirection="column">
          {Image.selectedImage && !isMobile && (
            <Box
              alignItems="center"
              id="img"
              height={700}
              width={850}
              bg="white"
              alignContent="center"
              pt={20}
            >
              <canvas ref={canvasRef} height={600} width={850}></canvas>
            </Box>
          )}
          {Image.selectedImage && isMobile && (
            <Box
              id="img"
              boxSize="auto"
              bg="white"
              alignContent="center"
              pt={20}
            >
              <canvas
                ref={canvasRef}
                height={canvasHeight}
                width={canvasWidth}
              ></canvas>
            </Box>
          )}
          {Image.selectedImage && (
            <Box py={4}>
              <Flex justifyContent="center">
                <FormLabel>Choose Text Color</FormLabel>
                <Checkbox
                  isChecked={Color.isBlack}
                  onChange={handleBlackChange}
                  colorScheme="twitter"
                  outline="black"
                >
                  Black
                </Checkbox>
                <Checkbox
                  isChecked={Color.isWhite}
                  onChange={handleWhiteChange}
                >
                  White
                </Checkbox>
              </Flex>
            </Box>
          )}
        </Box>

        {Image.selectedImage && !isMobile && (
          <Flex justifyContent="center" mt={4}>
            {!showImageBtnDisabled && (
              <Button
                colorScheme="teal"
                fontFamily="Helvetica"
                fontSize={["md", "2xl"]}
                p={10}
                borderRadius={19}
                onClick={initializeFabric}
                style={{ margin: "0 10px" }}
                disabled={showImageBtnDisabled}
              >
                Show Image
              </Button>
            )}
            <Button
              colorScheme="teal"
              fontFamily="Helvetica"
              fontSize={["md", "2xl"]}
              p={10}
              borderRadius={19}
              onClick={handleTextAdd}
              style={{ margin: "0 10px" }}
            >
              Add Text
            </Button>
            <Button
              colorScheme="teal"
              fontFamily="Helvetica"
              fontSize={["md", "2xl"]}
              p={10}
              borderRadius={19}
              onClick={handleDownload}
              style={{ margin: "0 10px" }}
            >
              download Image
            </Button>
            <Button
              colorScheme="teal"
              fontFamily="Helvetica"
              fontSize={["md", "2xl"]}
              p={10}
              borderRadius={19}
              onClick={handleSave}
              style={{ margin: "0 10px" }}
            >
              Save Image
            </Button>
          </Flex>
        )}

        {Image.selectedImage && isMobile && (
          <VStack justifyContent="center" mt={4} spacing={4}>
            {!showImageBtnDisabled && (
              <Button
                colorScheme="teal"
                fontFamily="Helvetica"
                fontSize={["md", "2xl"]}
                p={10}
                borderRadius={19}
                onClick={initializeFabric}
                style={{ margin: "0 10px" }}
                disabled={showImageBtnDisabled}
              >
                Show Image
              </Button>
            )}
            <Button
              colorScheme="teal"
              fontFamily="Helvetica"
              fontSize={["md", "2xl"]}
              p={10}
              borderRadius={19}
              onClick={handleTextAdd}
              style={{ margin: "0 10px" }}
            >
              Add Text
            </Button>
            <Button
              colorScheme="teal"
              fontFamily="Helvetica"
              fontSize={["md", "2xl"]}
              p={10}
              borderRadius={19}
              onClick={handleSave}
              style={{ margin: "0 10px" }}
            >
              Save Image
            </Button>
          </VStack>
        )}
      </Box>
    </div>
  );
};

export default Home;
