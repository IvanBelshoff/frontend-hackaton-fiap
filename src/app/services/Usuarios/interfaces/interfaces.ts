export interface IUsuario {
    id: number,
    nome: string,
    sobrenome: string,
    email: string,
    codigo_vendedor?: string,
    bloqueado: boolean,
    localidade: string,
    tipo_usuario: TipoUsuario
    usuario_atualizador?: string,
    usuario_cadastrador?: string
    ultimo_login: Date,
    data_criacao: Date,
    data_atualizacao: Date,
}

export enum TipoUsuario {
    CON = 'consultor',
    COOR = 'coordenador',
    GER = 'gerente',
    ADM = 'administrador',
}

export interface IDataToken {
    accessToken: string;
    id: number;
    typeUser: TipoUsuario,
    foto: {
        nome: string;
        originalname: string;
        width: number;
        height: number;
        url: string;
        tamanho: number;
    },
    regras: string[];
    permissoes: string[];
}

export interface IUsuarioComTotalCount {
    data: IUsuario[];
    totalCount: number;
}


