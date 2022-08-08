import { Box, CircularProgress, Container } from '@material-ui/core';
import { DiariaStatus } from 'data/@types/DiariaInterface';
import useDetalhesDiaria from 'data/hooks/pages/diarias/useDetalhesDiaria.page';
import { DateService } from 'data/services/DateService';
import { DiariaService } from 'data/services/DiariaService';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Status from 'ui/components/data-display/Status/Status';
import { CardsContainer, JobsDetails, JobTitle } from './_detalhes-diaria.styled';


const DetalhesDiaria: React.FC<{id: string}> = ({id}) => {
    
    const {diaria, diarista, cliente} = useDetalhesDiaria(id);

    if(!diaria.id){
        return (
            <Container sx={{textAlign: 'center', my: 10}}>
                <CircularProgress />
            </Container>
        )
    }
    
    return (
        <Container>
            <PageTitle title={`Detalhes da diária: #${id}`} />
            <CardsContainer>
                <JobsDetails>
                    <JobTitle>Detalhes da Diária</JobTitle>
                    <Box sx={{mb: 2}}>
                        Status: <Status color={DiariaService.getStatus(
                            diaria.status as DiariaStatus
                        ).color}>
                            {DiariaService.getStatus(diaria.status as DiariaStatus).label}
                        </Status>
                    </Box>
                    <div>
                        Data: <strong>{TextFormatService.reverseDate(diaria.data_atendimento as string)}</strong>
                    
                    <br />
                    Horário: <strong>{DateService.getTimeFromDate(diaria.data_atendimento as string)}</strong>
                    <br />
                    Endereço: <strong>{TextFormatService.getAddress(diaria)}</strong>
                    </div>
                </JobsDetails>
            </CardsContainer>
        </Container>
    );
};
export default DetalhesDiaria;