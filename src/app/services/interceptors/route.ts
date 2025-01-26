import { AxiosResponse } from 'axios';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { InternalAxiosRequestConfig } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
    return response;
};

export const requestInterceptor = async (request: InternalAxiosRequestConfig) => {

    const session = await getServerSession(nextAuthOptions);

    const token = session?.user?.accessToken || '';

    request.headers.authorization = `Bearer ${token}`;

    return request;

};