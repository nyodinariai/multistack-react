import { ApiLinksInterface } from './ApiLinksInterface';
export interface UserInterface{
    id?: number;
    password_confirmation?: string;
    new_password?: string;
    links?: ApiLinksInterface[],
    tipo_usuario: UserType;
    password?: string;
    last_login?:string;
    nome_completo: string;
    cpf: string;
    nascimento: string | Date;
    email: string;
    foto_usuario?: string;
    foto_documento?: string;
    telefone?: string;
    reputacao?: number;
    chave_pix: string;
    token?: {
        access: string;
        refresh: string;
    }
}

export interface UserShortInformationInterface {
    nome_completo: string;
    foto_usuario?: string;
    reputacao?: number;
    cidade: string;
}

export enum UserType{
    Cliente = 1 as number,
    Diarista = 2 as number,
}