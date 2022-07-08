import axios from 'axios';
import { QueryClient } from 'react-query';

const apiClientStock = axios.create({
 // baseURL: 'http://localhost:8080/api/nepseHistory/other/',
});

const queryClient = new QueryClient();

export { apiClientStock, queryClient };