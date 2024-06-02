import React, { useEffect, useState } from 'react';
import { Box, Grid, Select, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('asc');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products');
        setProducts(response.data.data); // Accessing the data array from the response
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredProducts = products
    .filter(product => filter === 'all' || product.category === filter)
    .sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={5}>
      <Box mb={5} display="flex" justifyContent="space-between">
        <Select onChange={handleSortChange} value={sort} width="200px">
          <option value="asc">Sort by Price: Ascending</option>
          <option value="desc">Sort by Price: Descending</option>
        </Select>
        <Select onChange={handleFilterChange} value={filter} width="200px">
          <option value="all">All Categories</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="jewelery">Jewelry</option>
          <option value="electronics">Electronics</option>
        </Select>
      </Box>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;