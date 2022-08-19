import { yupResolver } from '@hookform/resolvers/yup';
import { ApiLinksInterface } from './../../../@types/ApiLinksInterface';
import { EnderecoInterface } from './../../../@types/EnderecoInterface';
import { CadastroDiaristaFormDataInterface } from './../../../@types/FormInterface';
import { UserInterface, UserType } from './../../../@types/UserInterface';
import { ExternalServiceContext } from './../../../contexts/ExternalServicesContext';
import { 
    ApiService, 
    ApiServiceHateoas, 
    linksResolver 
} from './../../../services/ApiService';
import { FormSchemaService } from './../../../services/FormSchemaService';
import { LocalStorage } from 'data/services/StorageService';
import { TextFormatService } from 'data/services/TextFormatService';
import { UserService } from './../../../services/UserService';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

export default function useCadastroDiarista() {
    const [step, setStep] = useState(1),
        [isWaitingResponse, setWaitingResponse] = useState(false),
        breadcrumbItems = ['Identificação', 'Cidades atendidas'],
        userForm = useForm<CadastroDiaristaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData()
                    .concat(FormSchemaService.address())
                    .concat(FormSchemaService.newContact())
            ),
        }),
        [newUser, setNewUser] = useState<UserInterface>(),
        [newAddress, setNewAddress] = useState<EnderecoInterface>(),
        addressListForm = useForm<CadastroDiaristaFormDataInterface>(),
        enderecosAtendidos = addressListForm.watch('enderecosAtendidos'),
        { externalServiceState } = useContext(ExternalServiceContext),
        [sucessoCadastro, setSucessoCadastro] = useState(false);

    async function onUserSubmit(data: CadastroDiaristaFormDataInterface) {
        setWaitingResponse(true);

        const newUserLink = linksResolver(
            externalServiceState.externalServices,
            'cadastrar_usuario'
        );

        if (newUserLink) {
            try {
                await cadastrarUsuario(data, newUserLink);
            } catch (error) {
                handleUserError(error);
            }
        }
    }

    function handleUserError(error: any) {
        UserService.handleNewUserError(error, userForm);
        setWaitingResponse(false);
    }

    async function cadastrarUsuario(
        data: CadastroDiaristaFormDataInterface,
        link: ApiLinksInterface
    ) {
        const newUser = await UserService.cadastrar(
            data.usuario,
            UserType.Diarista,
            link
        );

        if (newUser) {
            setNewUser(newUser);
            cadastrarEndereco(data, newUser);
            setWaitingResponse(false);
            setStep(2);
        }
    }

    async function cadastrarEndereco(
        data: CadastroDiaristaFormDataInterface,
        newUser: UserInterface
    ) {
        console.log(newUser)
        ApiService.defaults.headers.common['Authorization'] = 'Bearer ' + newUser?.token?.access;
            
        LocalStorage.set('token', newUser.token?.access);
        LocalStorage.set('token_refresh', newUser.token?.refresh);

        console.log(newUser.links);

        ApiServiceHateoas(
            newUser.links,
            'cadastrar_endereco',
            async (request) => {
                console.log(request);
                const newAddress = (
                    await request<EnderecoInterface>({
                        data: {
                            ...data?.endereco,
                            cep: TextFormatService.getNumbersFromText(
                                data?.endereco.cep
                            ),
                            user_id: newUser.id,
                        },
                    })
                ).data;

                newAddress && setNewAddress(newAddress);
                console.log(newAddress);
            }
        );
    }

    async function onAddressSubmit(data: CadastroDiaristaFormDataInterface) {
        if (newUser) {
            ApiServiceHateoas(
                newUser.links,
                'relacionar_cidades',
                async (request) => {
                    try {
                        setWaitingResponse(true);
                        await request({
                            data: {
                                cidades: data?.enderecosAtendidos,
                            },
                        });

                        setSucessoCadastro(true);
                    } catch (error) {}
                }
            );
        }
    }

    return {
        step,
        isWaitingResponse,
        breadcrumbItems,
        userForm,
        onUserSubmit,
        addressListForm,
        onAddressSubmit,
        newAddress,
        sucessoCadastro,
        enderecosAtendidos,
    };
}