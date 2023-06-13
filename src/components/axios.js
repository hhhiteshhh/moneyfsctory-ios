import axios from 'axios';
import {MONEY_FACTORY} from '../consts/apis';

const instance = axios.create({
  baseURL: MONEY_FACTORY,
});

export default instance;
