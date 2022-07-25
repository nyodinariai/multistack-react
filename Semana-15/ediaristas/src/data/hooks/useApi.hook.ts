import { useEffect, useCallback } from 'react';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { ApiLinksInterface } from './../@types/ApiLinksInterface';
import { ApiService } from './../services/ApiService';
import { AxiosRequestConfig } from 'axios';
import useSWR, {mutate} from 'swr';


export default function useApi<OutputType>(
        endpoint: string | null, 
        config?: AxiosRequestConfig
        ): {data: OutputType | undefined; error: Error}{
    const {data, error} = useSWR<OutputType>(endpoint, async (url) => {
        const response = await ApiService(url, config);

        return response.data;
    })

    return {data, error}
}

export function useApiHateoas<OutputType>(
    links: ApiLinksInterface[] = [],
    name: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {

    const makeRequest = useCallback(() => {
        return new Promise<OutputType>((resolve) => {        
            ApiServiceHateoas(links, name || '', async (request) => {
            const response = await request<OutputType>(config);
            resolve(response.data);
        });
    });
    }, [links, name, config])

    const { data, error } = useSWR<OutputType>(name, makeRequest);

    useEffect(() => {
        mutate(name, makeRequest);
    }, [links, name, makeRequest]);


    return { data, error };
}