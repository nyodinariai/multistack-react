import { ServicoInterface } from './../../@types/ServivoInterface';
import { NovaDiariaFormDataInterface, CadastroClienteFormDataInterface, LoginFormDataInterface, PagamentoFormDataInterface } from './../../@types/FormInterface';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { FormSchemaService } from 'data/services/FormSchemaService';
import useSWR from 'swr';
import useApi from '../useApi.hook';

export default function useContratacao(){
      
    const [step, setStep] = useState(1),
        [hasLogin, setHasLogin] = useState(false),
        [loginError, setLoginError] = useState(''),
        breadcrumbItems = ['Detalhes da Diaria', 'Identificação', 'Pagamento'],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(
                    FormSchemaService.detalhesServico()
                )
            ),
        }),
        clientForm = useForm<CadastroClienteFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData().concat(
                    FormSchemaService.newContact()
                )
            ),
        }),
        loginForm = useForm<LoginFormDataInterface>({
            resolver: yupResolver(FormSchemaService.login()),
        }),
        paymentForm = useForm<PagamentoFormDataInterface>({
            resolver: yupResolver(FormSchemaService.payment()),
        }),
        servicos = useApi<ServicoInterface[]>('/api/servicos').data;

        function onServiceFormSubmit(data: NovaDiariaFormDataInterface){
            console.log(data)
        }

        function onClientFormSubmit(data: CadastroClienteFormDataInterface){
            console.log(data)
        }

        function onLoginFormSubmit(data: LoginFormDataInterface){
            console.log(data)
        }
        function onPaymentFormSubmit(data: PagamentoFormDataInterface){
            console.log(data)
        }

    return {
        step,
        setStep,
        breadcrumbItems,
        serviceForm,
        clientForm,
        onServiceFormSubmit,
        servicos,
        hasLogin,
        setHasLogin,
        onClientFormSubmit,
        loginForm,
        onLoginFormSubmit,
        loginError,
        paymentForm,
        onPaymentFormSubmit

    
    }
}