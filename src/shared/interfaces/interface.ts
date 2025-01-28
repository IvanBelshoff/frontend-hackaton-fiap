
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
