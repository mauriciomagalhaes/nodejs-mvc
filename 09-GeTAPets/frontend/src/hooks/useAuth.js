import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashmessage from './useFlshMessage';

export default function useAuth() {

    const [authenticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = useFlashmessage();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.Authrization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
    }, []);

    // Register user
    async function register(user){

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'

        try {
            const data = await api.post('/users/register', user).then(response => {
                return response.data
            });

            await authUser(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType);
    }
    
    // Authenticate user
    async function authUser(data){
        setAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/');
    }

    function logout(){
        const msgText = 'Logout realizado com sucesso!';
        const msgType = 'sucess';
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authrization = undefined;
        navigate('/');

        setFlashMessage(msgText, msgType);
    }

    return { authenticated, register, logout }
}