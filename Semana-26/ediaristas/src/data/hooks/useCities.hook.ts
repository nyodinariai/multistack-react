import { LocationService } from './../services/LocationService';
import { useEffect, useState } from 'react';
import { CidadeInterface } from './../@types/EnderecoInterface';


export default function useCities(estado: string): CidadeInterface[] {
 const [listaCidades, setListaCidades] = useState<CidadeInterface[]>([]);

 useEffect(() => {
     if (estado) {
         setListaCidades([]);
         LocationService.cidades(estado).then((listaCidades) => {
             listaCidades && setListaCidades(listaCidades);
         });
     }
 }, [estado]);

    return listaCidades;
}