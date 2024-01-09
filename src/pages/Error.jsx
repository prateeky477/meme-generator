import React from 'react'
import { Flex, Box, Text, Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Error() {
  const toast = useToast();

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      background="gray.200"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <Box textAlign="center">
          <Text fontSize="6xl" fontWeight="bold" mb={4}>
            404
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={8}>
            Oops! Page not found.
          </Text>
          <Button as={Link} to="/" colorScheme="blue" mr={4}>
            Go Home
          </Button>
        </Box>
      </motion.div>
    </Flex>
  );
}

export default Error