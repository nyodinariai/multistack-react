import { Oportunidade } from 'data/@types/OportunidadeInterface';
import useIsMobile  from 'data/hooks/useIsMobile';
import { useState } from 'react';
import usePagination from '../usePagination.hook';

export default function useOportunidadesTrabalho(){
        const isMobile = useIsMobile(),
        [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<Oportunidade>(),
        oportunidades = [] as Oportunidade[],
        {currentPage, setCurrentPage, totalPages, itemsPerPage} = usePagination(oportunidades || [], 5);

        function seCandidatar(oportunidade: Oportunidade ){

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
            seCandidatar
        };
}