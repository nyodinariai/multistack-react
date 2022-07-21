import { ApiService } from './../services/ApiService';
import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';


export default function useApi<OutputType>(endpoint: string | null, config?: AxiosRequestConfig): {data: OutputType | undefined, error: Error}{
    const {data, error} = useSWR<OutputType>(endpoint, async (url) => {
        const response = await ApiService(url, config);

        return response.data;
    })

    return {data, error}
}