import { LocationService } from './../services/LocationService';
import { useEffect } from 'react';
import { useState } from 'react';
import { CidadeInterface } from './../@types/EnderecoInterface';


export default function useCities(estado: string): CidadeInterface[]{
    const [ listaCidades, setListaCidades] = useState<CidadeInterface[]>([]);

    useEffect(()=>{
        if(estado){
            setListaCidades([]);
            LocationService.cidades(estado).then((ListaCidades) => {
                listaCidades && setListaCidades
            })
        }
    }, []);



    return listaCidades;
}