import { TextField } from "@mui/material";
import { UserContext } from "data/contexts/UserContext";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FinancialData } from "../UserForm.styled";

export const FinancialForm = () => {
    const { register } = useFormContext(),
        {user} = useContext(UserContext).userState;

    return <FinancialData>
        <TextField 
            label={'Chave PIX'}
            defaultValue={user.chave_pix}
            {...register('usuario.chave_pix', { minLength: 5})}
        />
    </FinancialData>
}