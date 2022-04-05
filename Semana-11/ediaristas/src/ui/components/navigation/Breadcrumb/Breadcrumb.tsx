import React from 'react';
//import { } from '@material-ui/core'
import { BreadcrumbContainer, BreadcrumbItem } from './Breadcrumb.styled';

export interface BreadcrumbProps {
    selected: string;
    items: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ selected, items }) => {
    return (
        <BreadcrumbContainer>
            {items.map((item, index) => (
                <BreadcrumbItem key={item}>{item}</BreadcrumbItem>
            ))}
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;
