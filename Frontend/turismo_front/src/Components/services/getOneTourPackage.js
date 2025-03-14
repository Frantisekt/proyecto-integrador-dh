import axios from 'axios';

const API_URL = 'http://localhost:8087/api/tourPackages';

const getTourPackage = async (packageId) => {
    try {
        const response = await axios.get(`${API_URL}/${packageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tour package:', error.response?.data || error.message);
        throw error;
    }
};

export default getTourPackage;