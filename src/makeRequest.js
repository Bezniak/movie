import axios from "axios";

export const makeRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
    }
});
