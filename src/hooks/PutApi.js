import axios from '../components/axios';

const PutApi = async (url, formData) => {
 
  const result = await axios.put(url, formData);
  return result;
  
};

export default PutApi;
