import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {endpoint} from '../config'

const refreshAuthLogic = failedRequest => axios.post(`${endpoint}/user/refresh`, {
        'refreshToken': `${localStorage.getItem('refreshToken')}`
    })
        .then(tokenRefreshResponse => {
            console.log('refresh request');
            localStorage.setItem('accessToken', tokenRefreshResponse.data.accessToken);
            localStorage.setItem('refreshToken', tokenRefreshResponse.data.refreshToken);
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.accessToken;
            return Promise.resolve();
        })
        .catch((err) => {
            console.log('refresh expired');
            window.location.href = '/auth';
        });

createAuthRefreshInterceptor(axios, refreshAuthLogic);