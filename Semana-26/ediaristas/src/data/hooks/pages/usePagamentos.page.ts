import { PagamentoInterface, PagamentoStatus } from './../../@types/PagamentoInterface';
import { useApiHateoas } from 'data/hooks/useApi.hook';
import { UserContext } from './../../contexts/UserContext';
import useIsMobile from 'data/hooks/useIsMobile';
import usePagination from 'data/hooks/usePagination.hook';
import { useContext, useState, useMemo } from 'react';

export default function usePagamentos() {
    const isMobile = useIsMobile(),
        { userState } = useContext(UserContext),
        pagamentos = useApiHateoas<PagamentoInterface[]>(userState.user.links, 'lista_pagamentos').data,
        [filtro, setFiltro] = useState('pago'),
        filteredData = useMemo(() => {
            return filtrarPagamentos(pagamentos || [], filtro);
        }, [pagamentos, filtro]),
        { currentPage, setCurrentPage, totalPages, itemsPerPage } =
            usePagination(filteredData, 5)

    function filtrarPagamentos(pagamentos: PagamentoInterface[], filtro: string) {
        return pagamentos.filter((item) => {
            return(
                filtro === 'pago' && item.status === PagamentoStatus.Pago || (filtro === 'aguardando' && item.status === PagamentoStatus.Aguardando_Transferencia)
            )
        });
    }

    function alterarFiltro(filtro: string) {
        setCurrentPage(1);
        setFiltro(filtro);
    }
    
    
    return {
        filteredData,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        isMobile,
        filtro,
        setFiltro,
        alterarFiltro,
    };
}
