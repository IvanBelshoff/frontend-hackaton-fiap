'use server';

// imports externos
import { isAxiosError } from "axios";

// imports internos
import { Api } from "../Api";
import { IResponseError, IResponseErrosGeneric, IUsuarioDetalhado } from "@/shared/interfaces/interface";


export interface IUsuarioByIdLoader {
    errors?: {
        default?: string
    },
    sucess?: {
        data: IUsuarioDetalhado;
    }
}

export interface ILoaderUsuarioById {
    response?: {
        data: {
            errors?: {
                default?: string
            }
        }
    }
}

export async function getUsuarioById(id: number): Promise<IUsuarioByIdLoader | undefined> {

    try {

        const res = await Api().get(`/usuarios/${id}`);

        if (res.status == 200) {

            const data: IUsuarioByIdLoader = {
                sucess: {
                    data: res.data,
                }
            };

            return data;
        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as ILoaderUsuarioById).response?.data.errors;

            const responseError: IResponseError = {
                message: errors?.default || 'Erro ao consultar o registros.',
                code: error.code == 'ECONNREFUSED' ? 502 : error.response?.status
            };

            if (error.response?.status == 401 || error.response?.status == 500 || error.code == 'ECONNREFUSED') {
                throw new Error(JSON.stringify(responseError));
            }

            const response: IUsuarioByIdLoader = {
                errors: errors
            };

            // Retorno dos erros
            return response;

        }

        const errors = (error as IResponseErrosGeneric).response;

        const response: IUsuarioByIdLoader = {
            errors: {
                default: errors?.data?.errors?.default || 'Erro ao consultar o registros.',
            }
        };

        return response;
    }

}
