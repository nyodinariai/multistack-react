import React from 'react';
//import { } from '@material-ui/core'
import { ItemCounterContainer, CircleButton } from './ItemCounter.styled';

export interface ItemCounterProps {
    label: string;
    plural: string;
    counter: number;
    onInc: () => void;
    onBack: () => void;
}

const ItemCounter: React.FC<ItemCounterProps> = ({
    label,
    plural,
    counter = 0,
    onInc,
    onBack,
}) => {
    return (
        <ItemCounterContainer>
            <CircleButton onClick={onBack}>
                <i className={'twf-minus'}></i>
            </CircleButton>
            <span>
                {counter} {counter > 1 ? plural : label}
            </span>
            <CircleButton onClick={onInc}>
                <i className={'twf-plus'}></i>
            </CircleButton>
        </ItemCounterContainer>
    );
};

export default ItemCounter;
