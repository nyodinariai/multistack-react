import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UserType } from 'data/@types/UserInterface';

import UserHeaderMenu from './UserHeaderMenu';

export default {
    title: 'navigation/UserHeaderMenu',
    component: UserHeaderMenu,
    argTypes: {},
} as ComponentMeta<typeof UserHeaderMenu>

    const Template: ComponentStory<typeof UserHeaderMenu> = (args) => (
        <UserHeaderMenu {...args} />
    );

export const Default = Template.bind({});
Default.args = {
    user: {
        nome_completo: 'Nathan Nariai',
        nascimento: '2022-07-07',
        cpf: '00000000000',
        email: 'nathan@nathan.com.br',
        foto_usuario: 'https://avatars.githubusercontent.com/u/15325812?v=4',
        telefone: '(99) 99999-9999',
        tipo_usuario: UserType.Cliente,
        reputacao: 0,
        password: '',
        chave_pix: '',
    },
    isMenuOpen: false,
};