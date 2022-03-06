import { useState } from 'react';
import myStyles from './Contador.module.css';
import { MinhaDiv, MeuBotao } from './Contador.style'

function Contador(props){
    const [numero, setNumero ] = useState(9)

    
    return (
        <MinhaDiv className={myStyles['meu-contador']}>
            Contador: <span>{numero}</span>
            <MeuBotao onClick={() => setNumero(numero + 1)} >Click</MeuBotao>
        </MinhaDiv>
    );
}

export default Contador;