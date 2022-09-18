import { DiariaInterface } from 'data/@types/DiariaInterface';
import { DiariaContext } from 'data/contexts/DiariasContext';
import useIsMobile from 'data/hooks/useIsMobile';
import usePagination from 'data/hooks/usePagination.hook';
import { linksResolver } from 'data/services/ApiService';
import { useContext, useState } from 'react';

export default function useMinhasDiarias() {
    const isMobile = useIsMobile(),
        { diariaState } = useContext(DiariaContext),
        { diarias } = diariaState,
        filteredData = diarias,
        { 
            currentPage, 
            setCurrentPage, 
            totalPages, 
            itemsPerPage } =
            usePagination(diarias, 5),
         [diariaConfirmar, setDiariaConfirmar] = useState({} as DiariaInterface)   

        function podeVisualizar(diaria: DiariaInterface): boolean {
                    return linksResolver(diaria.links, 'self') !== undefined;
        }

        function podeConfirmar(diaria: DiariaInterface): boolean {
            return linksResolver(diaria.links, 'confirmar_diarista') !== undefined;
        }

    return {
        filteredData,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        isMobile,
        podeVisualizar,
        podeConfirmar,
        diariaConfirmar,
        setDiariaConfirmar
    };
}
