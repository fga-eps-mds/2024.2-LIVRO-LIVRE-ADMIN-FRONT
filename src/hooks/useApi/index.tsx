import axios from "axios";
import { useMemo } from "react"
import { API_BASE_URL, API_BOOKS_URL, API_RENTALS_URL } from "../../config/environment";
import { User } from "../../interfaces/user";

const createApiInstance = (url: string) => {
  const instance = axios.create({
    baseURL: url || '/',
  });
  instance.interceptors.request.use((config) => config, (error) => Promise.reject(error));
  instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));
  return instance;
};

const getDefaultErrorUseAPIMessage = (err: any) => {
  return {
    error: true,
    ...err?.response,
    ...err?.response?.data,
  };
};

const useApi = () => {
  const api = useMemo(
    () => ({
      base: createApiInstance(API_BASE_URL),
      books: createApiInstance(API_BOOKS_URL),
      rentals: createApiInstance(API_RENTALS_URL),
    }),
    [],
  );

  return {
    signIn: (data: {
      email: string;
      password: string
    }): Promise<{ data: {
      accessToken: string;
      refreshToken: string;
    } }> => {
      return new Promise((resolve) => {
        api.base
          .post('/auth/signin', {
            ...data,
            role: 'admin',
          })
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    },
    getUsers: (data: {
      perPage: number;
      page: number
    }, token: string | null): Promise<{ data: {
      items: User[],
      total: number,
    } }> => {
      return new Promise((resolve) => {
        api.base
          .get('/users', {
            params: {
              perPage: data.perPage,
              page: data.page,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    },
  }
}

export default useApi
