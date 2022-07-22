import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API;

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

export function linksResolver(
    links: ApiLinksInterface[] = [],
    name: string
): ApiLinksInterface | undefined{
    return links.find((link) => link.rel === name);
}