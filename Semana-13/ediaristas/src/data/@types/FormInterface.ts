import { UserInterface } from './UserInterface';
import { DiariaInterface } from './DiariaInterface';
import { EnderecoInterface } from './EnderecoInterface';
export interface NovaDiariaFormDataInterface{
    endereco: EnderecoInterface
    faxina: DiariaInterface
}

export interface CadastroClienteFormDataInterface{
    usuario: UserInterface
}