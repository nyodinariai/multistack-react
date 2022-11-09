import React from 'react';
//import { } from '@mui/material'
import { ItemCounterContainer, CircleButton } from './ItemCounter.styled';

export interface ItemCounterProps {
    label: string;
    plural: string;
    counter: number;
    onInc: () => void;
    onDec: () => void;
}

const ItemCounter: React.FC<ItemCounterProps> = ({
    label,
    plural,
    counter = 0,
    onInc,
    onDec,
}) => {
    return (
        <ItemCounterContainer>
            <CircleButton onClick={onDec}>
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
