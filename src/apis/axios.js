import axios from "axios";
import { keysToCamelCase } from "neetocist";

// Function to transform response keys to camelCase
const transformResponseKeysToCamelCase = response => {
  if (response.data) {
    response.data = keysToCamelCase(response.data);
  }
};

// Function to set HTTP headers
const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

// Function to set up response interceptors
const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);

      return response.data;
    },
    error => Promise.reject(error)
  );
};

// Function to initialize Axios with default configuration
export default function initializeAxios() {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setHttpHeaders();
  responseInterceptors();
}
