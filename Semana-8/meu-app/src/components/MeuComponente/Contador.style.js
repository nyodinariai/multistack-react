import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const minhaCor = 'blue';

export const MinhaDiv = styled('div')`
    color: ${({ theme }) => theme.palette.primary.dark};
`;

export const MeuBotao = styled(Button)`
    background-color: blue;
    padding: ${({ theme }) => theme.spacing(2)};

    &.MuiButton-root{
        color: white;
    }
`;