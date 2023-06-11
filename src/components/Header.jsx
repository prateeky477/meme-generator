import { Box, Flex, Image } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import logo from '../assets/logo.png'
const Header = () => {
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
