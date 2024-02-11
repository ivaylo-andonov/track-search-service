import { Logger } from 'ts-log';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const httpClientFactory = (logger: Logger) => ({
  get: async <T>(config: AxiosRequestConfig) => {
    return axios
      .request<T>(config)
      .then(({ data }) => data)
      .catch((error: AxiosError) => {
        logger.log(`Axios error`, error);
        throw error;
      });
  },
});

export type HttpClient = ReturnType<typeof httpClientFactory>;
