import { LocalStorage } from './StorageService';
import { ApiService } from './ApiService';
import { LoginFormDataInterface } from 'data/@types/FormInterface';
import { UserInterface } from 'data/@types/UserInterface';

export const LoginService = {
    async login(credentials: LoginFormDataInterface): Promise<boolean>{
        try {
           const { data } = await ApiService.post<{
                access: string; 
                refresh:string;
            }>('/auth/token/', credentials);

            LocalStorage.set('token', data.access);
            LocalStorage.set('token_refresh', data.refresh);

            ApiService.defaults.headers.common['Authorization'] = 'Bearer ' + data.access

            return true;
        } catch (error) {
            return false
        }
    },
    logout(){
        ApiService.post('/auth/logout/', {
            refresh: LocalStorage.get('token_refresh', '')
        });
        LocalStorage.clear('token')
        LocalStorage.clear('token_refresh')
    },
    async getUser(): Promise<UserInterface | undefined>{
        const token = LocalStorage.get('token', '');

        if(token){
            ApiService.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            return (await ApiService.get<UserInterface>('/api/me')).data
        }

        return undefined;
    }
}