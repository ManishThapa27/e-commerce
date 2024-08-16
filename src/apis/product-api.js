import apiClient from './axios-api';

/**
 * To get a list of products from the server.
 */
const fetchAllProducts = async () => {
    try {
      const response = await apiClient.get('/products');      
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /**
   * To get the product categoies
   * @returns 
   */
  const fetchProductCategories = async () => {
    try {
      const response = await apiClient.get('/products/categories');      
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

export {fetchAllProducts,fetchProductCategories}; 