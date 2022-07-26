import { ExternalServiceContext } from './../../contexts/ExternalServicesContext';
import { LoginService } from './../../services/LoginService';
import { UserContext } from './../../contexts/UserContext';
import { useContext } from 'react';
import { useState } from 'react';
import { LoginFormDataInterface } from './../../@types/FormInterface';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';

export default function useLogin(){
    const formMethods = useForm<{login: LoginFormDataInterface}>({
        resolver: yupResolver(FormSchemaService.login()),
    });

    const [errorMessage, setErrorMessage] = useState(''),
    {userDispatch} = useContext(UserContext),
    {externalServiceState} = useContext(ExternalServiceContext)


    async function onSubmit(data: {login: LoginFormDataInterface}){
        setErrorMessage('');
        const loginSuccess = await LoginService.login(data.login)

        if(loginSuccess){
            const user = await LoginService.getUser();
            userDispatch({type: 'SET_USER', payload: user})
        }else{
            setErrorMessage('E-mail e/ou senha inválidos')
        }
    }

    return {
        formMethods,
        errorMessage,
        onSubmit,
        externalServiceState
    }
}