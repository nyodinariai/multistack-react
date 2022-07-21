import React from "react";
import { FormContainerStyled } from "./UserForm.styled";
//import { } from '@material-ui/core'
//import { Component } from './UserForm.styled'

export interface UserFormProps{}

export const UserFormContainer = FormContainerStyled;

const UserForm: React.FC<UserFormProps> = () =>{

    return (
        <div>
            <div>UserForm</div>
        </div>
    )
}

export default UserForm;

export * from './forms/AddressForm';
export * from './forms/NewContactForm';
export * from './forms/PaymentForm';
export * from './forms/PictureForm';
export * from './forms/UserDataForm';
export * from './forms/LoginForm';