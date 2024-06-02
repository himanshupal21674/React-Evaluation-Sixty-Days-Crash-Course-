import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.image} alt={product.title} />

      <Box p={6}>
        <Text fontWeight="bold" fontSize="xl" mb={2}>{product.title}</Text>
        <Text mb={2}>Category: {product.category}</Text>
        <Text fontWeight="bold" mb={2}>${product.price}</Text>
        <Button as={Link} to={`/components/${product.id}`} colorScheme="red">
          More Details
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
