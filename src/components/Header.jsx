import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import logo from "../assets/logo.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };
  
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bg="white"
      boxShadow="md"
      zIndex="999"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingX={4}
        height={14}
      >
        <Image src="https://maymaydb.s3.ap-south-1.amazonaws.com/logo.png" alt="Logo" height={12} borderRadius='full' />
        {isAuthenticated ? (
          <Flex alignItems="center">
            <Text marginRight={4}>Welcome, {current_user}</Text>
            <Link to="/saved">Saved</Link>
            <Button marginLeft={4} onClick={handleLogout}>Logout</Button>
          </Flex>
        ) : (
          <a
            href="https://github.com/prateeky477/meme-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub size={24} />
          </a>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
