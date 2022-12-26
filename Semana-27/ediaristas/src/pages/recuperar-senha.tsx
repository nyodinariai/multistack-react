import React from 'react'; 
import { GetStaticProps } from 'next'; 
import { useRouter } from 'next/router';
import { FormFieldsRecuperarSenha } from '@styles/pages/recuperar-senha.styled';
import { Container } from '@mui/system';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import TextField  from 'ui/components/inputs/TextField/TextField';
import { LoginButton } from '@styles/pages/login.styled';
import { useRecuperarSenha } from 'data/hooks/pages/useRecuperarSenha';
import { Snackbar } from '@mui/material';




export const getStaticProps: GetStaticProps = async () => { 
  return {
    props: { title: 'RecuperarSenha', },
  }; 
 }; 
const RecuperarSenha: React.FC = () => { 
    const router = useRouter(),
     {
        email,
        setEmail,
        pedirTokenRecuperacao,
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        resetarSenha,
        mensagemSnack,
        setMensagemSnack,
    } = useRecuperarSenha(router.query.token as string);
  return (
      <Container>
          <PageTitle title={'Recuperação de Senha'} />
          {router.query.token ? (
              <FormFieldsRecuperarSenha>
                  <TextField
                      label={'Digite seu E-mail'}
                      type={'email'}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      fullWidth
                  />
                  <TextField
                      label={'Digite a sua nova senha'}
                      type={'password'}
                      value={senha}
                      onChange={(event) => setSenha(event.target.value)}
                      fullWidth
                  />
                  <TextField
                      label={'Confirme a nova senha'}
                      type={'password'}
                      value={confirmarSenha}
                      onChange={(event) =>
                          setConfirmarSenha(event.target.value)
                      }
                      fullWidth
                  />
                  <LoginButton
                      size={'large'}
                      variant={'contained'}
                      color={'secondary'}
                      onClick={resetarSenha}
                  >
                      Redefinir Senha
                  </LoginButton>
              </FormFieldsRecuperarSenha>
          ) : (
              <FormFieldsRecuperarSenha>
                  <TextField
                      label={'Digite seu E-mail'}
                      type={'email'}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                  />
                  <LoginButton
                      size={'large'}
                      variant={'contained'}
                      color={'secondary'}
                      onClick={pedirTokenRecuperacao}
                  >
                      Recuperar Senha
                  </LoginButton>
              </FormFieldsRecuperarSenha>
          )}

          <Snackbar
            open={mensagemSnack.length > 0}
            autoHideDuration={5000}
            message={mensagemSnack}
            onClose={() => setMensagemSnack('')}
          />
      </Container>
  ); 
}; 

export default RecuperarSenha;