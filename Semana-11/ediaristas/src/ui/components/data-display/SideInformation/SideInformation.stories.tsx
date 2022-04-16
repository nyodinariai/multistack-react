import { ComponentMeta, ComponentStory } from '@storybook/react';

import SideInformation from './SideInformation';

export default {
    title: 'data-display/SideInformation',
    component: SideInformation,
    argTypes: {},
} as ComponentMeta<typeof SideInformation>;

const Template: ComponentStory<typeof SideInformation> = (args) => (
    <SideInformation {...args} />
);

export const Default = Template.bind({});
Default.args = {
    title: 'Detalhes',
    items: [
        {
            title: 'Tipo',
            description: ['Limpeza de Rotina'],
            icon: 'twf-check-circle',
        },
        {
            title: 'Tamanho',
            description: ['3 cômodos', '2 banheiros'],
            icon: 'twf-check-circle',
        },
        {
            title: 'Data',
            description: ['14/12/2020'],
            icon: 'twf-check-circle',
        },
    ],
    footer: {
        text: 'R$185,00',
        icon: 'twf-credit-card',
    },
};
export const NoIconNoFooter = Template.bind({});
NoIconNoFooter.args = {
    title: 'Como funciona',
    items: [
        {
            title: '1 - Cadastro',
            description: ['Você faz o cadastro e escolhe as cidades atendidas'],
            icon: '',
        },
        {
            title: '2 - Receba Propostas',
            description: [
                'Você receberá os serviços por email e notificação no celular',
            ],
            icon: '',
        },
        {
            title: '3 - Diária Agendada',
            description: [
                'Se o perfil for escolhido pelo cliente você receberá a confirmação do agendamento',
            ],
            icon: '',
        },
    ],
};
