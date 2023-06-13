import axios from '../components/axios';

const PostApi = async (url, formData) => {
  const result = await axios.post(url, formData);
  return result;
};

export default PostApi;
