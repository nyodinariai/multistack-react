import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function useCadastroDiarista(){

    const [step, setStep] = useState(2),
        breadcrumbItems = ['Identificação', 'Cidades atendidas'],
        userForm = useForm(),
        addressListForm = useForm()

        return{
            step,
            breadcrumbItems,
            userForm,
            addressListForm
        }
}