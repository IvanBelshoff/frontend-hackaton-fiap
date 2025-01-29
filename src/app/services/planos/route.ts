import { isAxiosError } from "axios";
import { Api } from "../Api";
import { IResponseError, IResponseErrosGeneric } from "@/shared/interfaces/interface";

export interface IPlano {
    id: number;
    tema: string;
    nivel: string;
    conteudo: string;
    duracao: string;
    data_criacao: Date;
    data_atualizacao: Date;
}

export interface IPlanosLoader {
    errors?: {
        default?: string
    },
    sucess?: {
        data: IPlano[];
        totalCount: number;
    }
}

export interface ILoaderPlanos {
    response?: {
        data: {
            errors?: {
                default?: string
            }
        }
    }
}

export async function getAll(page?: string, limit?: string, filter?: string): Promise<IPlanosLoader | undefined> {

    try {

        const res = await Api().get('/planos', {
            params: {
                page: page || undefined,
                limit: limit || undefined,
                filter: filter || undefined
            }
        });

        if (res.status == 200) {

            const data: IPlanosLoader = {
                sucess: {
                    data: res.data,
                    totalCount: Number(res.headers['x-total-count'] || 0),
                }
            };

            return data;
        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as ILoaderPlanos).response?.data.errors;

            const responseError: IResponseError = {
                message: errors?.default || 'Erro ao consultar o registros.',
                code: error.code == 'ECONNREFUSED' ? 502 : error.response?.status
            };

            if (error.response?.status == 401 || error.response?.status == 500 || error.code == 'ECONNREFUSED') {
                throw new Error(JSON.stringify(responseError));
            }

            const response: IPlanosLoader = {
                errors: errors
            };

            // Retorno dos erros
            return response;

        }

        const errors = (error as IResponseErrosGeneric).response;

        const response: IPlanosLoader = {
            errors: {
                default: errors?.data?.errors?.default || 'Erro ao consultar o registros.',
            }
        };

        return response;
    }

}

export interface IPlanoGetById {
    errors?: {
        default?: string
    },
    sucess?: {
        data: IPlano;
    }
}

export async function getById(id: string): Promise<IPlanoGetById | undefined> {

    try {
        const res = await Api().get(`/planos/${id}`);

        if (res.status == 200) {

            const data: IPlanoGetById = {
                sucess: {
                    data: res.data,
                }
            };

            return data;
        }

    } catch (error) {

        if (isAxiosError(error)) {
            const errors = (error as ILoaderPlanos).response?.data.errors;

            const responseError: IResponseError = {
                message: errors?.default || 'Erro ao consultar o registros.',
                code: error.code == 'ECONNREFUSED' ? 502 : error.response?.status
            };

            if (error.response?.status == 401 || error.response?.status == 500 || error.code == 'ECONNREFUSED') {
                throw new Error(JSON.stringify(responseError));
            }

            const response: IPlanoGetById = {
                errors: errors
            };

            // Retorno dos erros
            return response;

        }

        const errors = (error as IResponseErrosGeneric).response;

        const response: IPlanoGetById = {
            errors: {
                default: errors?.data?.errors?.default || 'Erro ao consultar o registros.',
            }
        };

        return response;
    }

}