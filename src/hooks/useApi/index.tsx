import axios from "axios";
import { useMemo } from "react"
import { API_BASE_URL } from "../../config/environment";
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
    () =>
      createApiInstance(API_BASE_URL),
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
        api
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
        api
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
    exportToCsv: (userIds: string[]): Promise<void> => {
      return new Promise((resolve, reject) => {
        api
          .get('/export', {
            params: { userIds: userIds.join(',') },
            responseType: 'blob',
          })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'export.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            resolve();
          })
          .catch((err) => {
            console.error('Erro ao baixar o CSV:', err);
            reject(getDefaultErrorUseAPIMessage(err));
          });
      });
    },

  }
}

export default useApi
