import { Oportunidade } from 'data/@types/OportunidadeInterface';
import useIsMobile  from 'data/hooks/useIsMobile';

export default function useOportunidadesTrabalho(){
        const isMobile = useIsMobile(),
        oportunidades = [] as Oportunidade[];

        return {
            isMobile,
            oportunidades
        }
}