import { linksResolver, ApiServiceHateoas } from 'data/services/ApiService';
import { UserContext } from 'data/contexts/UserContext';
import { useApiHateoas } from 'data/hooks/useApi.hook';
import { Oportunidade } from 'data/@types/OportunidadeInterface';
import useIsMobile  from 'data/hooks/useIsMobile';
import { useState, useContext } from 'react';
import usePagination from '../usePagination.hook';
import { mutate } from 'swr';

export default function useOportunidadesTrabalho(){
        const isMobile = useIsMobile(),
        [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<Oportunidade>(),
        {userState} = useContext(UserContext),
        oportunidades = useApiHateoas<Oportunidade[]>(userState.user.links, 'lista_oportunidades').data || ([]),
        [mensagemSnackBar, setMensagemSnackBar] = useState(''),
        {currentPage, setCurrentPage, totalPages, itemsPerPage} = usePagination(oportunidades || [], 5);
        

        async function seCandidatar(oportunidade: Oportunidade ){
            ApiServiceHateoas(oportunidade.links, 'candidatar_diaria', async (request) => {
                try{
                    await request();
                    setMensagemSnackBar('Candidatura enviada')
                    setOportunidadeSelecionada(undefined);
                    atualizarOportunidades();
                }catch(error){}
            })
        }

        function totalComodos(oportunidade: Oportunidade){
            let total = 0
            total += oportunidade.quantidade_banheiros;
            total += oportunidade.quantidade_cozinhas;
            total += oportunidade.quantidade_outros;
            total += oportunidade.quantidade_quartos;
            total += oportunidade.quantidade_quintais;
            total += oportunidade.quantidade_salas;

            return total
        }

                function podeCandidatar(oportunidade: Oportunidade) {
                    return (
                        linksResolver(
                            oportunidade.links,
                            'candidatar_diaria'
                        ) !== undefined
                    );
                }

        function atualizarOportunidades(){
            mutate('lista_oportunidades');
        }

        return {
            isMobile,
            oportunidades,
            currentPage,
            setCurrentPage,
            totalPages,
            itemsPerPage,
            oportunidadeSelecionada,
            setOportunidadeSelecionada,
            seCandidatar,
            mensagemSnackBar,
            setMensagemSnackBar,
            totalComodos,
            podeCandidatar
        };
}