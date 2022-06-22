
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api-sistemas-de-comandas.herokuapp.com/api'
});