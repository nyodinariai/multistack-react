import { Autocomplete, MenuItem } from "@material-ui/core"
import useAddressForm from "data/hooks/components/inputs/UserForm/forms/useAddressForm"
import { Controller } from "react-hook-form"
import Select from "../../Select/Select"
import TextField from "../../TextField/TextField"
import TextFieldMask from "../../TextFieldMask/TextFieldMask"
import { AddressData } from "../UserForm.styled"


export const AddressForm = () => {
    const { control, errors, estados, opcoesCidades, addressState, register } =
        useAddressForm();

    return (
        <AddressData>
            <Controller
                name={'endereco.cep'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        inputRef={ref}
                        mask={'99.999-999'}
                        label={'CEP'}
                        style={{ gridArea: 'cep' }}
                        error={errors?.endereco?.cep !== undefined}
                        helperText={errors?.endereco?.cep?.message}
                    />
                )}
            />

            <Controller
                name={'endereco.estado'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <Select
                        {...inputProps}
                        label={'Estado'}
                        style={{ gridArea: 'estado' }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {estados.map((estado) => (
                            <MenuItem key={estado.sigla} value={estado.sigla}>
                                {estado.nome}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />

            <Controller
                name={'endereco.cidade'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <Autocomplete
                        {...inputProps}
                        onChange={(_event, newValue) => {
                            inputProps.onChange(newValue);
                        }}
                        disablePortal
                        options={opcoesCidades}
                        style={{ gridArea: 'cidade' }}
                        disabled={addressState === ''}
                        loading={opcoesCidades.length === 0}
                        loadingText={'Carregando cidades...'}
                        noOptionsText={'Nenhuma cidade com esse nome'}
                        renderInput={(params) => (
                            <TextField 
                                label={'Cidade'} {...params}
                                InputLabelProps={{
                                    required: false
                                }}
                                />
                        )}
                        
                    />
                )}
            />

            <Controller
                name={'endereco.bairro'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextField
                        label={'Bairro'}
                        style={{ gridArea: 'bairro' }}
                        {...inputProps}
                        error={errors?.endereco?.bairro !== undefined}
                        helperText={errors?.endereco?.bairro?.message}
                    />
                )}
            />

            <Controller
                name={'endereco.logradouro'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextField
                        label={'Logradouro'}
                        style={{ gridArea: 'logradouro' }}
                        {...inputProps}
                        error={errors?.endereco?.logradouro !== undefined}
                        helperText={errors?.endereco?.logradouro?.message}
                    />
                )}
            />

            <TextField
                label={'Número'}
                style={{ gridArea: 'numero' }}
                defaultValue={''}
                {...register('endereco.numero')}
                error={errors?.endereco?.numero !== undefined}
                helperText={errors?.endereco?.numero?.message}
            />

            <TextField
                label={'Complemento'}
                style={{ gridArea: 'complemento' }}
                defaultValue={''}
                {...register('endereco.complemento')}
                error={errors?.endereco?.complemento !== undefined}
                helperText={errors?.endereco?.complemento?.message}
                required={false}
            />
        </AddressData>
    );
};