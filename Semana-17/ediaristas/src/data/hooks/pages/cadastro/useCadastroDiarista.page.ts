import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function useCadastroDiarista(){

    const [step, setStep] = useState(1),
        breadcrumbItems = ['Identificação', 'Cidades atendidas'],
        userForm = useForm();

        return{
            step,
            breadcrumbItems,
            userForm
        }
}