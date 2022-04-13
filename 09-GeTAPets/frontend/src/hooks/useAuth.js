import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFlashmessage from './useFlshMessage';

export default function useAuth() {

    const { setFlashMessage } = useFlashmessage();

    async function register(user){

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'

        try {
            const data = await api.post('/users/register', user).then(response => {
                return response.data
            });
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType);
    }
    
    return { register }
}