import { ApiService } from './../../services/ApiService';
import { ValidationService } from './../../services/ValidationService';
import { UserShortInformationInterface } from './../../@types/UserInterface';
import { useState, useMemo } from 'react';

export default function useVerificarProfissionais() {
    const [cep, setCep] = useState(''),
        cepValido = useMemo(() => {
            return ValidationService.cep(cep);
        }, [cep]),
        [erro, setErro] = useState(''),
        [buscaFeita, setBuscaFeita] = useState(false),
        [carregando, setCarregando] = useState(false),
        [diaristas, setDiaristas] = useState(
            [] as UserShortInformationInterface[]
        ),
        [diaristasRestantes, setDiaristasRestantes] = useState(0);

    async function buscarProfissionais(cep: string) {
        setBuscaFeita(false);
        setCarregando(true);
        setErro('');
        try {
            console.log('Inicio da Requisição: ', cep);
            const { data } = await ApiService.get<{
                diaristas: UserShortInformationInterface[];
                quantidade_diaristas: number;
            }>(`/api/diaristas/localidades?cep=${cep.replace(/\D/g, '')}`);
            console.log('Resposta da requisição: ', cep);

            setBuscaFeita(true);
            setDiaristas(data.diaristas);
            setDiaristasRestantes(data.quantidade_diaristas);
            setCarregando(false);
        } catch (error) {
            console.log('Erro na requisição: ', error);
            setErro('CEP não encontrado');
            setCarregando(false);
        }
    }

    return {
        cep,
        setCep,
        cepValido,
        buscarProfissionais,
        erro,
        diaristas,
        buscaFeita,
        carregando,
        diaristasRestantes,
    };
}
