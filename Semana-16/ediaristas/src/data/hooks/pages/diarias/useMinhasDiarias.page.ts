import { useContext } from 'react';
import { DiariaContext } from "data/contexts/DiariasContext";
import useIsMobile from "data/hooks/useIsMobile";
import usePagination from 'data/hooks/usePagination.hook';


export default function useMinhasDiarias(){
    const isMobile = useIsMobile(),
        {diariaState } = useContext(DiariaContext),
        {diarias} = diariaState,
        {
            currentPage,
            setCurrentPage,
            totalPages,
            itemsPerPage
        } = usePagination(diarias, 5)

        return {
            currentPage,
            setCurrentPage,
            totalPages,
            itemsPerPage,
            isMobile
        }
}