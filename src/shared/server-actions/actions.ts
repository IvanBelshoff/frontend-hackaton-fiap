/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { isAxiosError } from "axios";

import { Api } from "@/app/services/Api";
import { IDataToken } from "../interfaces/interface";
import { revalidatePath } from "next/cache";


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


export interface IActionCreatePlano {
    response: {
        data: {
            errors?: {
                default?: string
                body?: {
                    tema?: string,
                    nivel?: string,
                    conteudo?: string
                    duracao?: string
                }
            }
        }
    }
}


export interface IcreatePlanoAction {
    errors?: {
        default?: string
        body?: {
            tema?: string,
            nivel?: string,
            conteudo?: string
            duracao?: string
        }
    }
    success?: {
        default?: string
    }
}

export async function createPlanoAction(prevState: any, formData: FormData) {

    try {

        const tema = formData.get('tema') as string;
        const nivel = formData.get('nivel') as string;
        const conteudo = formData.get('conteudo') as string;
        const duracao = formData.get('duracao') as string;

        const create = await Api().post('/planos',
            {
                tema: tema,
                nivel: nivel,
                conteudo: conteudo,
                duracao: duracao
            }
        );

        if (create.status == 201) {

            const response: IcreatePlanoAction = {
                success: {
                    default: 'Plano criado com sucesso',
                }
            };

            return response;

        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as IActionCreatePlano).response?.data.errors;

            const response: IcreatePlanoAction = {
                errors: {
                    default: errors?.default,
                    body: {
                        tema: errors?.body?.tema,
                        nivel: errors?.body?.nivel,
                        conteudo: errors?.body?.conteudo,
                        duracao: errors?.body?.duracao
                    }
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;

        } else {

            const response: IcreatePlanoAction = {
                errors: {
                    default: 'Erro desconhecido ao criar o plano.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }
    revalidatePath('/');
}


export interface IDeletePlanoByIdAction {
    errors?: {
        default?: string;
    },
    sucess?: {
        default: string;
    }
}

export interface IActionDeletePlanoById {
    response: {
        data: {
            errors?: {
                default?: string
            }
        }
    }
}

export async function deletePlanoById(prevState: any, formData: FormData): Promise<IDeletePlanoByIdAction | undefined> {

    try {
        const id = formData.get('id') as string;

        const res = await Api().delete(`/planos/${id}`);

        if (res.status == 204) {

            const data: IDeletePlanoByIdAction = {
                sucess: {
                    default: 'Registro deletado com sucesso.',
                }
            };

            return data;
        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as IActionDeletePlanoById).response?.data.errors;

            const response: IDeletePlanoByIdAction = {
                errors: {
                    default: errors?.default,
                }
            };

            return response;

        } else {

            const response: IDeletePlanoByIdAction = {
                errors: {
                    default: 'Erro desconhecido ao deletar o registro.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }

    revalidatePath('/planos');
}