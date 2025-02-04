/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { isAxiosError } from "axios";

import { Api } from "@/app/services/Api";
import { IDataToken, IUsuarioDetalhado } from "../interfaces/interface";
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

export interface IDeleteFotoUsuarioByIdAction {
    errors?: {
        default?: string
    }
    success?: {
        default?: string
    }
}

export async function deleteFotoUsuarioById(prevState: any, formData: FormData) {

    try {

        const id = formData.get('id') as string;

        const create = await Api().delete(`/usuarios/foto/${parseInt(id)}`);

        if (create.status == 204) {

            const response: IDeleteFotoUsuarioByIdAction = {
                success: {
                    default: 'Foto deletada com sucesso',
                }
            };

            return response;

        }

    } catch (error) {

        if (isAxiosError(error)) {

            const response: IDeleteFotoUsuarioByIdAction = {
                errors: {
                    default: 'Erro ao deletar a foto.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;

        } else {

            const response: IDeleteFotoUsuarioByIdAction = {
                errors: {
                    default: 'Erro desconhecido ao deletar a foto'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }
    revalidatePath('/minha-conta');
}


export interface IUpdateUsuarioByIdAction {
    errors?: {
        default?: string
        body?: {
            nome?: string,
            sobrenome?: string,
            email?: string,
            bloqueado?: string,
            api_key?: string,
            tipo_usuario?: string,
            senha?: string
        }
    }
    success?: {
        default?: string,
        usuario?: IUsuarioDetalhado
    }
}

export interface IActionUpdateUsuarioById {
    response: {
        data: {
            errors?: {
                default?: string
                body?: {
                    nome?: string,
                    sobrenome?: string,
                    email?: string,
                    bloqueado?: string,
                    api_key?: string,
                    tipo_usuario?: string,
                    senha?: string
                }
            }
        }
    }
}

export async function updateUsuarioByIdAction(prevState: any, formData: FormData) {

    try {

        const id = formData.get('id') as string;
        const nome = formData.get('nome') as string;
        const sobrenome = formData.get('sobrenome') as string;
        const email = formData.get('email') as string;
        const api_key = formData.get('api_key') as string;
        const tipo_usuario = formData.get('tipo_usuario') as string;
        const foto = formData.get('foto') as File;

        const formDataUsuario = new FormData();

        formDataUsuario.append('nome', nome);
        formDataUsuario.append('sobrenome', sobrenome);
        formDataUsuario.append('email', email);
        formDataUsuario.append('api_key', api_key);
        formDataUsuario.append('tipo_usuario', tipo_usuario);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (foto && foto.type != 'application/octet-stream') && (
            formDataUsuario.append('foto', foto)
        );

        const create = await Api().put(`/usuarios/${id}`, formDataUsuario, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        );

        if (create.status == 200) {

            const usuario = create.data as IUsuarioDetalhado;
            
            const response: IUpdateUsuarioByIdAction = {
                success: {
                    default: 'Usuário atualzado com sucesso',
                    usuario: usuario
                }
            };

            return response;

        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as IActionUpdateUsuarioById).response?.data.errors;

            const response: IUpdateUsuarioByIdAction = {
                errors: {
                    default: errors?.default,
                    body: {
                        nome: errors?.body?.nome,
                        sobrenome: errors?.body?.sobrenome,
                        email: errors?.body?.email,
                        bloqueado: errors?.body?.bloqueado,
                        tipo_usuario: errors?.body?.tipo_usuario,
                        api_key: errors?.body?.api_key,
                        senha: errors?.body?.senha
                    }
                }
            };

            return response;

        } else {

            const response: IUpdateUsuarioByIdAction = {
                errors: {
                    default: 'Erro desconhecido ao atualizar o usuário.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }

    revalidatePath('/minha-conta');
}

export interface IActionResetPasswordById {
    response: {
        data: {
            errors?: {
                default?: string
                body?: {
                    senha?: string
                }
            }
        }
    }
}

export interface IResetPasswordByIdAction {
    errors?: {
        default?: string;
        body?: {
            senha?: string
        }
    }
    success?: {
        default?: string
    }
}

export async function resetPasswordById(prevState: any, formData: FormData) {

    try {

        const id = formData.get('id') as string;

        const senha = formData.get('senha') as string;

        console.log(id, senha);

        const create = await Api().patch(`/usuarios/password/${parseInt(id)}`, {
            senha: senha
        });

        if (create.status == 204) {

            const response: IResetPasswordByIdAction = {
                success: {
                    default: 'Senha resetada com sucesso',
                }
            };

            return response;

        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as IActionResetPasswordById).response?.data.errors;

            console.log(errors);

            const response: IResetPasswordByIdAction = {
                errors: {
                    default: errors?.default,
                    body: {
                        senha: errors?.body?.senha
                    }
                }
            };

            return response;

        } else {

            const response: IResetPasswordByIdAction = {
                errors: {
                    default: 'Erro desconhecido ao resetar a senha'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }
    revalidatePath('/minha-conta');
}


export interface IDeleteUsuarioByIdAction {
    errors?: {
        default?: string;
    },
    sucess?: {
        default: string;
    }
}

export interface IActionDeleteUsuarioById {
    response: {
        data: {
            errors?: {
                default?: string
            }
        }
    }
}


export async function deleteUsuarioById(prevState: any, formData: FormData): Promise<IDeleteUsuarioByIdAction | undefined> {

    try {
        const id = formData.get('id') as string;

        const res = await Api().delete(`/usuarios/${id}`);

        if (res.status == 204) {

            const data: IDeleteUsuarioByIdAction = {
                sucess: {
                    default: 'Registro deletado com sucesso.',
                }
            };

            return data;
        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as IActionDeleteUsuarioById).response?.data.errors;

            const response: IDeleteUsuarioByIdAction = {
                errors: {
                    default: errors?.default,
                }
            };

            return response;

        } else {

            const response: IDeleteUsuarioByIdAction = {
                errors: {
                    default: 'Erro desconhecido ao deletar o registro.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }

    revalidatePath('/usuarios');
}



export interface IActionCreateNewUser {
    response: {
        data: {
            errors?: {
                default?: string
                body?: {
                    nome?: string,
                    sobrenome?: string,
                    email?: string,
                    bloqueado?: string,
                    api_key?: string,
                    tipo_usuario?: string,
                    senha?: string
                }
            }
        }
    }
}


export interface ICreateNewUserAction {
    errors?: {
        default?: string
        body?: {
            nome?: string,
            sobrenome?: string,
            email?: string,
            bloqueado?: string,
            api_key?: string,
            tipo_usuario?: string,
            senha?: string
        }
    }
    success?: {
        default?: string
    }
}

export async function newUser(prevState: any, formData: FormData): Promise<ICreateNewUserAction | undefined> {

    try {

        const nome = formData.get('nome') as string;
        const sobrenome = formData.get('sobrenome') as string;
        const email = formData.get('email') as string;
        const api_key = formData.get('api_key') as string;
        const tipo_usuario = formData.get('tipo_usuario') as string;
        const foto = formData.get('foto') as File;
        const senha = formData.get('senha') as string;

        console.log(nome);
        console.log(sobrenome);
        console.log(email);
        console.log(api_key);
        

        console.log(tipo_usuario);

        const formDataUsuario = new FormData();

        formDataUsuario.append('nome', nome);
        formDataUsuario.append('sobrenome', sobrenome);
        formDataUsuario.append('email', email);
        formDataUsuario.append('api_key', api_key);
        formDataUsuario.append('tipo_usuario', tipo_usuario);
        formDataUsuario.append('senha', senha);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (foto && foto.type != 'application/octet-stream') && (
            formDataUsuario.append('foto', foto)
        );

        const create = await Api().post('/usuarios', formDataUsuario, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        );

        if (create.status == 201) {

            const response: ICreateNewUserAction = {
                success: {
                    default: 'Usuário criado com sucesso',
                }
            };

            return response;

        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as IActionCreateNewUser).response?.data.errors;

            const response: ICreateNewUserAction = {
                errors: {
                    default: errors?.default,
                    body: {
                        nome: errors?.body?.nome,
                        sobrenome: errors?.body?.sobrenome,
                        email: errors?.body?.email,
                        bloqueado: errors?.body?.bloqueado,
                        api_key: errors?.body?.api_key,
                        tipo_usuario: errors?.body?.tipo_usuario,
                        senha: errors?.body?.senha
                    }
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;

        } else {

            const response: ICreateNewUserAction = {
                errors: {
                    default: 'Erro desconhecido ao criar usuário.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }

    revalidatePath('/usuarios');
}