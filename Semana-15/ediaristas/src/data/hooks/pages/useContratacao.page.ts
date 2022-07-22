import { ApiService } from 'data/services/ApiService';
import { ExternalServiceContext } from './../../contexts/ExternalServicesContext';
import { useContext } from 'react';
import { houseParts } from './../../../ui/partials/encontrar-diarista/_detalhes-servico';
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
import { linksResolver } from 'data/services/ApiService';

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
        { externalServiceState } = useContext(ExternalServiceContext),
        servicos = useApi<ServicoInterface[]>('/api/servicos').data,

        dadosFaxina = serviceForm.watch('faxina'),
        cepFaxina = serviceForm.watch('endereco.cep'),
        [podemosAtender, setPodemosAtender] = useState(true),
        
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if(servicos && dadosFaxina?.servico){
                const selectedService = servicos.find((servico) => servico.id === dadosFaxina?.servico)
                if(selectedService){
                    return selectedService;
                }
            }
            return {} as ServicoInterface
        }, [servicos, dadosFaxina?.servico]),

        tamanhoCasa = useMemo<string[]>(() => {
            return listarComodos(dadosFaxina);
        }, [tipoLimpeza, dadosFaxina]),

        totalTime = useMemo<number>( () => {
            return calcularTempoServico(dadosFaxina, tipoLimpeza)
        }, [
            dadosFaxina, 
            tipoLimpeza,
            dadosFaxina?.quantidade_banheiros,
            dadosFaxina?.quantidade_cozinhas,
            dadosFaxina?.quantidade_outros,
            dadosFaxina?.quantidade_quartos,
            dadosFaxina?.quantidade_quintais,
            dadosFaxina?.quantidade_salas
            ]);

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

        useEffect(() => {
            const cep = ((cepFaxina as string) ||  '' ).replace(/\D/g, '');
            if(ValidationService.cep(cep)){
                

                const linkDisponibilidade = linksResolver(
                    externalServiceState.externalServices, 'verificar_disponibilidade_atendimento'
                );

                if(linkDisponibilidade){
                    ApiService.request<{ disponibilidade : boolean}>({
                        url: linkDisponibilidade.uri + '?cep='+ cep,
                        method: linkDisponibilidade.type
                    })
                    .then((response) => {setPodemosAtender(response.data.disponibilidade)}).catch((_error) => setPodemosAtender(false))
                }
            } else {
                setPodemosAtender(true)
            }

        }, [cepFaxina])

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

        
        function listarComodos(dadosFaxina: DiariaInterface): string[] {
            const comodos: string[] = [];
            if(dadosFaxina){
                houseParts.forEach((housePart) => {
                    const total = dadosFaxina[
                        housePart.name as keyof DiariaInterface
                    ] as number;
                    if(total > 0){
                        const nome = total > 1 ? housePart.plural : housePart.singular;
                        comodos.push(`${total} ${nome}`)
                    }
                })
            }


            return comodos
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
        podemosAtender,
        tamanhoCasa,
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