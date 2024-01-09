import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Button,
  VStack,
  Image,
  Box,
  Text,
  useDisclosure,
  Center,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ImgContext } from "../context/imageContext";
import { Navigate, useNavigate } from "react-router-dom";
const Template = () => {
  const img = useContext(ImgContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageInfo, setImageInfo] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("")
  const [fileSelected, setFileSelected] = useState()
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [selectedTemp, setSelectedTemp] = useState(null);

  const navigate = useNavigate();
  const handleImageSelect = (image) => {
    // Handle the logic for selecting the image
    setSelectedTemp(image);
    img.setSelectedImage(image)
    navigate("/")
  };

  useEffect(() => {
    const fetchTemp = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_URL+"/temp", {
          withCredentials: true,
        });

        const temps = response.data;

        // console.log(temps);

        if (Array.isArray(temps)) {
          setImages(temps);
        } else {
          console.error("Invalid response format for images");
        }
      } catch (err) {
        setError(err.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemp();
  }, [isClicked, setIsClicked]);
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = fileSelected

    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.set('title', imageInfo);

    try {
      setIsLoading(true);
      const response = await axios.post(import.meta.env.VITE_REACT_APP_URLL+'/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully:');
    } catch (error) {
      console.error('Error uploading image:', error);

    } finally {
      setIsClicked(!isClicked)
      setIsLoading(false);
      onClose();
      setFileName(null);
      setImageInfo("");
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileSelected(file)
      setFileName(file.name);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setImageInfo(value);
  };


  const handleModalOpen = () => onOpen();
  const handleModalClose = () => onClose();

  const handleUploadAndClose = () => {
    onClose();
    setFileName(null); // Clear file name after successful upload
    setImageInfo(""); // Clear input field after successful upload
  };

  return (
    <Center p={20}>
      <VStack spacing={4} align="center">
        <Button
          colorScheme="twitter"
          onClick={handleModalOpen}
          fontFamily="Helvetica"
          fontSize={["md", "2xl"]}
          p={10}
          borderRadius="lg"
        >
          Upload Template
        </Button>

        <Modal isOpen={isOpen} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload Image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
              <Button onClick={() => fileInputRef.current.click()} mb={4}>
                Select Image
              </Button>

              {selectedImage && (
                <Box>
                  <Image src={selectedImage} alt="Selected" boxSize="200px" />
                  <Text fontSize="md">File Name: {fileName}</Text>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={imageInfo.title}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    mt={2}
                  />
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleImageUpload}>
                Upload
              </Button>
              <Button variant="ghost" onClick={handleModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <VStack spacing={4} align="center">
          <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
            {images.map((image, index) => (
              <Box
                key={index}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m={4}
              >
                <Box className='p-10 transition ease-in-out delay-50 hover:scale-110 duration-500'>
                  <Box d="flex" alignItems="baseline">
                    <Button
                      onClick={() => handleImageSelect(image)}
                      variant={selectedImage === image ? 'solid' : 'outline'}
                      borderColor="gray.700"
                      p={0} 
                      h='300px' 

                      overflow="hidden"  // Ensure content doesn't overflow the button
                      position="relative"
                    >
                    
                      <Image src={image.s3_url} alt={`Image ${index}`} h='100%' w='100%' className='rounded-md' />
                      </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Flex>
        </VStack>
      </VStack>
    </Center>
  );
};

export default Template;
