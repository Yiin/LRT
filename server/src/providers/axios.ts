import axios from 'axios';

export const AxiosProvider = {
    provide: 'axios',
    useFactory() {
        return axios;
    },
};
