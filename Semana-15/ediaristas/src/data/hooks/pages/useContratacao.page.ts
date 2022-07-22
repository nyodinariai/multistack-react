import { DateService } from './../../services/DateService';
import { ValidationService } from './../../services/ValidationService';
import { useEffect } from 'react';
import { DiariaInterface } from './../../@types/DiariaInterface';
import { ServicoInterface } from './../../@types/ServivoInterface';
import { NovaDiariaFormDataInterface, CadastroClienteFormDataInterface, LoginFormDataInterface, PagamentoFormDataInterface } from './../../@types/FormInterface';
import { useState, useMemo } from 'react';
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
        servicos = useApi<ServicoInterface[]>('/api/servicos').data,

        dadosFaxina = serviceForm.watch('faxina'),
        
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if(servicos && dadosFaxina?.servico){
                const selectedService = servicos.find((servico) => servico.id === dadosFaxina?.servico)
                if(selectedService){
                    return selectedService;
                }
            }
            return {} as ServicoInterface
        }, [servicos, dadosFaxina]),

        totalTime = useMemo<number>( () => {
            return calcularTempoServico(dadosFaxina, tipoLimpeza)
        }, [dadosFaxina, tipoLimpeza]);

        useEffect(() => {
            if(
                dadosFaxina && 
                ValidationService.hora(dadosFaxina.hora_inicio) && 
                totalTime >= 0
                ){
                serviceForm.setValue(
                    'faxina.hora_termino', 
                    DateService.addHours(
                        dadosFaxina?.hora_inicio as string, totalTime
                        ),
                        {
                            shouldValidate: true
                        }
                    )
            }else{
                serviceForm.setValue('faxina.hora_termino','');
            }
        }, [dadosFaxina?.hora_inicio, totalTime])


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
        function calcularTempoServico(
            dadosFaxina: DiariaInterface,
            tipoLimpeza: ServicoInterface
        ){
            let total = 0;
            if(dadosFaxina && tipoLimpeza){
                total += tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
                total += tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
                total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
                total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos;
                total += tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
                total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
            }

            return total;
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