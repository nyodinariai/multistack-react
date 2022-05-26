import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToggleButtonGroup, { ToggleButton } from './ToggleButtonGroup';

export default {
    title: 'inputs/ToggleButtonGroup',
    component: ToggleButtonGroup,
    argTypes: {},
} as ComponentMeta<typeof ToggleButtonGroup>;

const Template: ComponentStory<typeof ToggleButtonGroup> = (args) => (
    <ToggleButtonGroup {...args}>
        <ToggleButton value="1">
            <i className="twf-cleaning-1">Limpeza de rotina</i>
        </ToggleButton>
        <ToggleButton value="2">
            <i className="twf-cleaning-2">Limpeza de Pesada</i>
        </ToggleButton>
        <ToggleButton value="3">
            <i className="twf-cleaning-3">Limpeza de pós obra</i>
        </ToggleButton>
    </ToggleButtonGroup>
);

export const Default = Template.bind({});
Default.args = {
    value: '1',
};
