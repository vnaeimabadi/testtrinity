import axios from 'axios';
import {BASE_URL} from '@env';

export const axiosInstance = axios.create({
  headers: {
    'content-type': 'application/json',
  },
  timeout: 30000,
});

export default () => {
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  // predicts baseURL from request.url
  axiosInstance.interceptors.request.use(
    async config => {
      //   const token = await AsyncStorage.getItem('userToken');
      //   if (token) {
      //     config.headers.Authorization = 'Bearer ' + token;
      //   }

      config.baseURL = BASE_URL;

      return config;
    },
    error => Promise.reject(error),
  );

  // handles invalidated authorization token
  axiosInstance.interceptors.response.use(
    response => response,
    err => {
      const originalRequest = err.config;
      if (err?.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({resolve, reject});
          })
            .then(data => {
              originalRequest.headers.Authorization = 'Bearer ' + data.token;
              return axiosInstance(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async function (resolve, reject) {
          const refreshToken = '';
          //    await AsyncStorage.getItem('userRefreshToken');
          let body = {
            refresh_token: refreshToken,
          };
          axiosInstance
            .post('/auth/refresh-token', body)
            .then(async responses => {
              const {access_token, refresh_token} = responses.data.data;

              //   await AsyncStorage.multiSet([
              //     ['userToken', access_token],
              //     ['userRefreshToken', refresh_token],
              //     ['tokenUpdated', 'true'],
              //   ]);

              axiosInstance.defaults.headers.common.Authorization =
                'Bearer ' + access_token;
              originalRequest.headers.Authorization = 'Bearer ' + access_token;

              processQueue(null, responses.data.data);
              resolve(axiosInstance(originalRequest));
            })
            .catch(err => {
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(err);
    },
  );
};
