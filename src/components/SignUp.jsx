import { useState, useContext } from "react";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                process.env.prod.REACT_APP_URL+"/signup",
                {
                    username: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            // console.log(response);

            // Assuming your backend returns a success message or some indicator of successful registration
            if (response.data && response.data.success) {
                // Set isAuthenticated to true and redirect to the home page
                setAuthenticated(true);
                navigate("/home");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                // console.error("Error:", err.message);
            }
        }
    };

    return (
        <Box maxW="500px" mx="auto" mt="8">
            <Text fontSize="4xl" textAlign="center" mb="8">
                Register
            </Text>
            {!isAuthenticated && (
                <form onSubmit={handleSubmit}>
                    <Stack spacing="4">
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </FormControl>
                        {error && (
                            <Text color="red.500" fontWeight="semibold">
                                {error}
                            </Text>
                        )}
                        <Button type="submit" colorScheme="blackAlpha">
                            Register
                        </Button>
                    </Stack>
                </form>
            )}
            <Link to="/signin">
                <Text m={5}>Already registered??? Login</Text>
            </Link>
        </Box>
    );
};

export default SignUp;
