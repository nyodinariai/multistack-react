import { Paper, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles"; 
// import { } from'@mui/material'; 

export const CardsContainer = styled('div')` 
    display: grid;
    grid: 1fr;
    margin-bottom: ${({theme}) => theme.spacing(5)};
    gap: ${({theme}) => theme.spacing(2)}

    ${({theme}) => theme.breakpoints.up('md')} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
        'detail detail'
        'housecleaner client';
        gap: ${({theme}) => theme.spacing(7)}
    }
`;

export const  JobTitle = styled(Typography)`
    color: ${({theme}) => theme.palette.primary.main}
    font-
`;
export const JobsDetails = styled(Paper)`

`;