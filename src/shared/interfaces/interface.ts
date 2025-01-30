
export enum TipoUsuario {
    PRO = 'professor',
    ADM = 'administrador',
}


export interface IDataToken {
    accessToken: string;
    id: number;
    typeUser: TipoUsuario,
    api_key: string;
    foto: {
        nome: string;
        originalname: string;
        width: number;
        height: number;
        url: string;
        tamanho: number;
    }
}


export interface IResponseErrosGeneric {
    response?: {
        data: {
            errors?: {
                default?: string
            }
        },
        status?: string
    }
}

export interface IResponseError {
    message: string;
    code: number | undefined;
}

export interface IUsuario {
    id: number,
    nome: string,
    sobrenome: string,
    email: string,
    bloqueado: boolean,
    api_key: string,
    tipo_usuario: TipoUsuario
    usuario_atualizador?: string,
    usuario_cadastrador?: string
    ultimo_login: Date,
    data_criacao: Date,
    data_atualizacao: Date,
}

export interface IFoto {
    id: number;
    nome: string;
    originalname: string;
    tipo: string;
    tamanho: number;
    local: string;
    url: string;
    width?: number;
    height?: number;
    data_criacao: string;
    data_atualizacao: string;
}

export interface IUsuarioDetalhado extends IUsuario {
    foto: IFoto,
}