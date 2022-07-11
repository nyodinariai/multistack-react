import { Button, Container, Divider, Typography } from '@material-ui/core';
import React from 'react';
import { NewContactForm, PictureForm, UserDataForm } from 'ui/components/inputs/UserForm/UserForm';
// import { Component } from './_cadastro-cliente.styled';


const CadastroCliente: React.FC<{onBack: () => void}> = ({onBack}) => { return (
    <>
        <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
            Dados Pessoais
        </Typography>
        <UserDataForm cadastro={true} />

        <Divider sx={{ mb: 5 }} />

        <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
            Hora da self envie uma foto segurando o documento
        </Typography>
        <PictureForm />
        <Typography sx={{ pt: 1, pb: 5 }} variant={'body2'}>
            Essa foto não será vista por ninguém
        </Typography>

        <Divider sx={{ mb: 5 }} />
        <Typography sx={{ pt: 1, pb: 5 }} variant={'body2'}>
            Dados de acesso
        </Typography>
        <NewContactForm />

        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button variant={'outlined'} color={'primary'} type={'button'} onClick={onBack}>
                Voltar para detalhes da diária
            </Button>
            <Button variant={'contained'} color={'secondary'} type={'submit'}>
                Ir para pagamento
            </Button>
        </Container>
    </>
);
};
export default CadastroCliente;