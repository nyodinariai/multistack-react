import { ExternalServiceContext } from "data/contexts/ExternalServicesContext";
import { ApiServiceHateoas } from "data/services/ApiService";
import { useContext, useState } from "react";

export function useRecuperarSenha(token = ''){
    const { externalServiceState } = useContext(ExternalServiceContext),
        [email, setEmail] = useState(''),
        [senha, setSenha] = useState(''),
        [confirmarSenha, setConfirmarSenha] = useState(''),
        [mensagemSnack, setMensagemSnack] = useState('');

    async function pedirTokenRecuperacao(){
        if(email.length > 8){
            ApiServiceHateoas(externalServiceState.externalServices,
            'solicitar_alteracao_senha',
            async (request) => {
                request({
                    data:{
                        email,
                    }
                });
                setMensagemSnack(
                    'Uma mensagem foi enviada ao seu E-mail para a recuperação de senha'
                );
            }
            );
        }else {
            setMensagemSnack('Digite um E-mail válido')
        }
    }

    async function resetarSenha() {
        if(email.length < 8){
            setMensagemSnack('Digite um e-mail válido');
            return;
        }

        if (senha.length < 8) {
            setMensagemSnack('Senha muito curta');
            return;
        }

        if (senha != confirmarSenha) {
            setMensagemSnack('As senhas estão diferentes');
            return;
        }
        ApiServiceHateoas(externalServiceState.externalServices, 'confirmar_alteracao_senha',async (request) => {
            try {
                await request({
                    data:{
                        token,
                        email,
                        password: senha,
                        password_confirmation: senha
                    }
                })
                setMensagemSnack('Senha resetada');
            } catch (error) {
                setMensagemSnack('Erro ao resetar senha');
            }
            
        })
    }

    return {
        email,
        setEmail,
        pedirTokenRecuperacao,
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        resetarSenha,
        mensagemSnack,
        setMensagemSnack
    }
}