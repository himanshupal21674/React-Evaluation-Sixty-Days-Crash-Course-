import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, useToast, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    onClose();
    toast({
      title: 'Item added to cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box maxW="lg" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="md" boxShadow="md">
      <Image src={product.image} alt={product.title} />
      <Box p={5}>
        <Text fontWeight="bold" fontSize="2xl">{product.title}</Text>
        <Text>{product.description}</Text>
        <Text fontWeight="bold">${product.price}</Text>
        <Button colorScheme="teal" mt={5} onClick={onOpen}>
          Add to Cart
        </Button>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add to Cart
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to add this item to the cart?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={handleAddToCart} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductDetailsPage;