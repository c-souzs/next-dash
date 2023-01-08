import axios from "axios";

const url = "https://next-dash-souzzs.vercel.app";

const axiosInstance = axios.create({
  baseURL: `${url}/api`,
});

export const api = {
    get: <T>(endpoint: string) => axiosInstance.get<T>(endpoint),
    post: <T, U>(endpoint: string, body: U) => axiosInstance.post<T>(endpoint, body),
    put: <T, U>(endpoint: string, body: U) => axiosInstance.put<T>(endpoint, body),
    delete: <T, U>(endpoint: string, body?: U) => axiosInstance.delete<T>(endpoint, {data: body}),
};