import React, { useState, useEffect } from "react";
import {
  VStack, Image, Box, Center, Flex, Button,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

const SavedMeme = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const fetchSavedMeme = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(process.env.prod.REACT_APP_URL+"/saved", {
          withCredentials: true,
        });

        // console.log(response.data);

        // Check if the response has the expected structure
        if (response.data) {
          setImages(response.data);
        } else {
          setError("Invalid response format for saved images");
        }
      } catch (err) {
        setError(err.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedMeme();
  }, [isClicked, setIsClicked]);

  const handleDelete = async (imageId) => {
    try {
      // Make a request to delete the image with the given ID
      await axios.delete(process.env.prod.REACT_APP_URL+`/delete/${imageId}`, {
        withCredentials: true,
      });

      // Update the state to reflect the deletion
      setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
    } catch (err) {
      console.error("Error deleting image:", err);
    }
    finally {
      setIsClicked(!isClicked)
    }
  };

  const handleDownload = (imageUrl, fileName) => {
    // Create a link element
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;

    // Trigger a click on the link to initiate the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Center p={20}>
      <VStack spacing={4} align="center">
        {isLoading && <p>Loading...</p>}
        {/* {error && <p>Error: {error}</p>} */}
        {!isLoading && images.length === 0 && (
          <>
            <p>No saved memes available. Be the first to create one!</p>
            <Link to={'/'}>
              <Button
                m={4}
                colorScheme="linkedin"
                fontFamily="Helvetica"
                fontSize={["md", "2xl"]}
                p={10}
                borderRadius="lg"
              >
                Home
              </Button>
            </Link>
          </>

        )}
        {images.length > 0 && (
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
                    <Image src={image.s3_url} alt={`Image ${index}`} h='300px' w='300px' className='rounded-md' />
                  </Box>
                </Box>
                <Flex justifyContent="space-between" mt={4}>
                  <Button onClick={() => handleDelete(image.image_id)} colorScheme="red">
                    Delete
                  </Button>
                  <Button onClick={() => handleDownload(image.s3_url, image.filename)} colorScheme="teal">
                    Download
                  </Button>
                </Flex>
              </Box>
            ))}
          </Flex>
        )}
      </VStack>
    </Center>
  );
};

export default SavedMeme;
