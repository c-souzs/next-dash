import axios from "axios";

const url = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: `${url}/api`,
});

export const api = {
    get: <T>(endpoint: string) => axiosInstance.get<T>(endpoint),
    post: <T, U>(endpoint: string, body: U) => axiosInstance.post<T>(endpoint, body),
    put: <T, U>(endpoint: string, body: U) => axiosInstance.put<T>(endpoint, body),
    delete: <T, U>(endpoint: string, body?: U | any) => axiosInstance.delete<T>(endpoint, body),
};