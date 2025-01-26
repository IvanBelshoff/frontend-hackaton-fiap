/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { isAxiosError } from "axios";

import { Api } from "@/app/services/Api";
import { IDataToken } from "../interfaces/interface";


export interface IActionLogin {
    response: {
        data: {
            errors?: {
                default?: string
                body?: {
                    email: string,
                    senha: string
                }
            }
            success?: {
                login?: {
                    message: string
                }
            }
        }
    }
}

export interface ILoginAction {
    errors?: {
        default?: string
        body?: {
            email?: string,
            senha?: string
        }
    }
    success?: {
        default?: string,
        data?: IDataToken
    }
}



export interface IActionRecoverPassword {
    response: {
        data: {
            errors?: {
                default?: string
                body?: {
                    emailRecuperacao: string
                }
            }
            success?: {
                login?: {
                    message: string
                }
            }
        }
    }
}

export interface IRecoverPasswordAction {
    errors?: {
        default?: string
        body?: {
            emailRecuperacao?: string
        }
    }
    success?: {
        default?: string
    }
}

export async function recoverPasswordAction(prevState: any, formData: FormData) {

    try {


        const email = formData.get('email') as string;

        const recoverPassword = await Api().post('/recuperar', { emailRecuperacao: email });

        if (recoverPassword.status == 200) {

            const response: IRecoverPasswordAction = {
                success: {
                    default: 'Login efetuado com sucesso',
                }
            };

            return response;

        }

    } catch (error) {
        if (isAxiosError(error)) {

            const errors = (error as IActionRecoverPassword).response?.data.errors;

            const response: IRecoverPasswordAction = {
                errors: {
                    default: errors?.default,
                    body: {
                        emailRecuperacao: errors?.body?.emailRecuperacao
                    }
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;

        } else {

            const response: IRecoverPasswordAction = {
                errors: {
                    default: 'Erro desconhecido ao recuperar a senha.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }


}

