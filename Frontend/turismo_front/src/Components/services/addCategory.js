import axios from 'axios';

const API_URL = 'http://localhost:8087/api/categories';

const addCategory = async (categoryData) => {
    try {
        const response = await axios.post(API_URL, categoryData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error.response?.data || error.message);
        throw error;
    }
};

export default addCategory;
