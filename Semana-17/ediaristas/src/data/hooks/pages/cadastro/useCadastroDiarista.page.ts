import { ApiService, ApiServiceHateoas, linksResolver } from './../../../services/ApiService';
import { UserService } from './../../../services/UserService';
import { ApiLinksInterface } from './../../../@types/ApiLinksInterface';
import { FormSchemaService } from './../../../services/FormSchemaService';
import { yupResolver } from '@hookform/resolvers/yup';
import { CadastroDiaristaFormDataInterface } from './../../../@types/FormInterface';
import { ExternalServiceContext } from './../../../contexts/ExternalServicesContext';
import { EnderecoInterface } from './../../../@types/EnderecoInterface';
import { UserInterface, UserType } from './../../../@types/UserInterface';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { LocalStorage } from 'data/services/StorageService';
import { TextFormatService } from 'data/services/TextFormatService';

export default function useCadastroDiarista(){

    const [step, setStep] = useState(1),
        [isWaitingResponse, setWaitingResponse] = useState(false),
        breadcrumbItems = ['Identificação', 'Cidades atendidas'],
        [newUser, setNewUser] = useState<UserInterface>(),
        userForm = useForm<CadastroDiaristaFormDataInterface>({
            resolver: yupResolver(FormSchemaService.userData()
                    .concat(FormSchemaService.address())
                    .concat(FormSchemaService.newContact())
                    ),
        }),
        [newAddress, setNewAddress] = useState<EnderecoInterface>(),
        addressListForm = useForm(),
        enderecosAtendidos = addressListForm.watch('enderecoAtendidos'),
        {externaServiceState} = useContext(ExternalServiceContext),
        [sucessoCadastro, setSucessoCadastro] = useState(false)

        async function onUserSubmit(data: CadastroDiaristaFormDataInterface){
            setWaitingResponse(true);

            const newUserLink = linksResolver(externaServiceState.externalServices, 'cadastrar_usuario')

            if(newUserLink){
                try{
                    await cadastrarUsuario(data, newUserLink);
                }catch (error){
                    handleUserError(error)
                }
            }

        }       
        
        function handleUserError(error: any) {
            UserService.handleNewUserError(error, userForm);
            setWaitingResponse(false)
        }

        async function cadastrarUsuario(data: CadastroDiaristaFormDataInterface, link: ApiLinksInterface){
            const newUser = await UserService.cadastrar(data.usuario, UserType.Diarista, link);

            if(newUser){
                setNewUser(newUser);
                cadastrarEndereco(data, newUser)
                setWaitingResponse(false);
                setStep(2)
            }
        }

 

        async function cadastrarEndereco(data: CadastroDiaristaFormDataInterface, newUser: UserInterface){
            ApiService.defaults.headers.common['Authorization'] = 'Bearer ' + newUser?.token?.access;

            LocalStorage.set('token', newUser.token?.access);
            LocalStorage.set('token_refresh', newUser.token?.refresh);

            ApiServiceHateoas(newUser.links, 'cadastrar_endereco', async (request) =>{
                const newAddress = (await request<EnderecoInterface>({
                    data: {
                        ...data?.endereco,
                        cep: TextFormatService.getNumbersFromText(
                            data?.endereco.cep
                            )
                    },
                })).data;

                newAddress && setNewAddress(newAddress)
            }
            )
        }

        async function onAddressSubmit(data: CadastroDiaristaFormDataInterface){
            if(newUser){
                ApiServiceHateoas(newUser.links, 'relacionar_cidades', async (request) => {
                    try {
                        setWaitingResponse(true);
                        await request({
                            data:{
                                cidades: data?.enderecosAtendidos
                            }
                        });

                        setSucessoCadastro(true);
                    } catch (error) {
                        
                    }
                })
            }
        }

        return{
            step,
            breadcrumbItems,
            userForm,
            onUserSubmit,
            addressListForm,
            onAddressSubmit,
            newAddress,
            sucessoCadastro,
            enderecosAtendidos,
        }
}