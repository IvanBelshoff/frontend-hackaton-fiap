import axios from 'axios';

import { requestInterceptor, responseInterceptor } from '../interceptors/route';
import { Environment } from '@/shared/environment';

export const Api = () => {

    const api = axios.create({
        baseURL: Environment.BASE_URL
    });

    api.interceptors.request.use(
        (request) => requestInterceptor(request)
    );

    api.interceptors.response.use(
        (response) => responseInterceptor(response)
    );

    return api;
};

