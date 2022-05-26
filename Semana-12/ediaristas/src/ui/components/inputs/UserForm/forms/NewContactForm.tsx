import { useFormContext } from "react-hook-form";
import TextField  from "../../TextField/TextField"
import PasswordStrength  from "ui/components/feedback/PasswordStrenght/PasswordStrenght"; 
import { NewContactData } from "../UserForm.styled"


export const NewContactForm = () => {

    const {register, formState: { errors }, watch} = useFormContext();

    const newPassword = watch('usuario.password');

    return (
        <NewContactData>
            <TextField
                label={'E-mail'}
                style={{ gridArea: 'email' }}
                {...register('usuario.email')}
                error={errors?.usuario?.email !== undefined}
                helperText={errors?.usuario?.email?.message}
            />
            <TextField
                type={'password'}
                label={'Senha'}
                style={{ gridArea: 'senha' }}
                {...register('usuario.password')}
                error={errors?.usuario?.password !== undefined}
                helperText={errors?.usuario?.password?.message}
            />
            <TextField
                type={'password'}
                label={'Confirmação da Senha'}
                style={{ gridArea: 'confirmar-senha' }}
                {...register('usuario.password_confirmation')}
                error={errors?.usuario?.password_confirmation !== undefined}
                helperText={errors?.usuario?.password_confirmation?.message}
            />
            <PasswordStrength password={newPassword || ''} />
        </NewContactData>
    );
}