import axios from 'axios';
import Cookies from 'js-cookie';

import store from '@/redux/store';
import { startLoaderAct, stopLoaderAct } from '@/redux/slice/loader.slice';
import { removeUserCookies } from '@/hooks/helper/cookies';


const request = axios.create({
    baseURL: process.env.BASE_URL
});

request.interceptors.request.use(
    (config) => {
        store.dispatch(startLoaderAct())
        const isWhiteListed = config.url.includes("userKyc")
        if (token && !isWhiteListed) {
            config.headers.Authorization = "shubham " + token
        }
        return config;
    },
    (error) => {
        store.dispatch(stopLoaderAct())
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (config) => {
        store.dispatch(stopLoaderAct())
        return config;
    },
    (error) => {
        store.dispatch(stopLoaderAct())
        const status = error?.response?.status || 400
        if (status === 401) {
            alert('Session Expired!')
            removeUserCookies()
            window.location.reload()
        }
        return Promise.reject(error);
    }
)

export default request;