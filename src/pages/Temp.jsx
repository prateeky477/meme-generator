import React, { useState, useRef } from "react";
import {
  Button,VStack,Image,Box,Text,useDisclosure,Center,Flex,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const Template = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageInfo, setImageInfo] = useState("");
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
  
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', imageInfo);
  
    try {
      setIsLoading(true); // Set loading to true while uploading
      const response = await axios.post(process.env.prod.REACT_APP_URL+'/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Image uploaded successfully:');
      // setImages((prevImages) => [...prevImages, response.data.imageUrl]); // Assuming the API returns the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error (e.g., show a toast notification)
    } finally {
      setIsLoading(false);
      onClose();
      setFileName(null); // Clear file name after successful upload
      setImageInfo(""); // Reset input field after upload (success or failure)
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
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
    setImages((prevImages) => [...prevImages, selectedImage]);
    onClose();
    setFileName(null); // Clear file name after successful upload
    setImageInfo(""); // Clear input field after successful upload
  };

  return (
    <Center>
      <VStack spacing={4} align="center">
        <Button
          colorScheme="twitter"
          onClick={handleModalOpen}
          fontFamily="Helvetica"
          fontSize={["md", "2xl"]}
          p={10}
          borderRadius="lg"
        >
          Upload Image
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
            {images.map((imageUrl, index) => (
              <Box
                key={index}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m={4}
              >
                <Box className=' p-10 transition ease-in-out delay-50  hover:scale-110 duration-500 '>
                  <Box d="flex" alignItems="baseline" className=''>
                    <Image src={imageUrl} alt={`Image ${index}`} h='300px' w='300px' className='rounded-md' />
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
