import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import logo from '../assets/logo.png';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [current_user, setCurrentUser] = useState();
  const { isAuthenticated, setIsauthenticated } = useContext(AuthContext);

  useEffect(() => {
    const userEmail = localStorage.getItem("user");
    const username = userEmail ? userEmail.split('@')[0].replace(/['"]/g, '') : '';
    setCurrentUser(username);
  }, [isAuthenticated]);
  
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
        <Button as={Link} to="/saved" variant="ghost">
          <Text>{current_user}</Text>
        </Button>
        <Image src={logo} alt="Logo" height={12} borderRadius='full' />
        <a
          href="https://github.com/prateeky477/meme-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub size={24} />
        </a>
      </Flex>
    </Box>
  );
};

export default Header;
