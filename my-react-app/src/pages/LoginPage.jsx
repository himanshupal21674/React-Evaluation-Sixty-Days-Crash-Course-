import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById('email').focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === 'test@test.com' && password === 'password') {
      const fakeToken = '1234567890abcdef';
      login(email, fakeToken);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <Text mb={3} fontSize="2xl">Login</Text>
        {error && <Text color="red.500">{error}</Text>}
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={3}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={3}
        />
        <Button type="submit" colorScheme="Green" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;