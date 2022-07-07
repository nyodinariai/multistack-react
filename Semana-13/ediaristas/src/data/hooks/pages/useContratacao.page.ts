import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { FormSchemaService } from 'data/services/FormSchemaService';

export default function useContratacao(){
    const [step, setStep] = useState(1),
        breadcrumbItems = ['Detalhes da Diaria', 'Identificação', 'Pagamento'],
        serviceForm = useForm({
            resolver: yupResolver(
                FormSchemaService.address()
            )
        });

    return {
        step,
        breadcrumbItems
    }
}