import useMinhasDiarias from 'data/hooks/pages/diarias/useMinhasDiarias.page';
import React from 'react';
// import { Component } from './_minhas-diarias.styled';


const MinhasDiarias: React.FC = () => { 
    
    const { currentPage, setCurrentPage, totalPages, itemsPerPage, isMobile } = useMinhasDiarias();
    
    return (
<div>
  <div>MinhasDiarias</div>
</div>
);
};

export default MinhasDiarias;