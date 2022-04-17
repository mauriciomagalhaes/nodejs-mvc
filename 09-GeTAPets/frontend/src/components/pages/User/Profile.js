import api from '../../../utils/api'

import { useState, useEffect } from 'react';

import style from './Profile.module.css'
import formStyle from '../../form/Form.module.css'

import Input from '../../form/Input';

function Profile(){

    const [user, setUser] = useState({})

    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e){}

    function handleChange(e){}

    return (
        <section>
            <div className={style.profile_header}>
                <h1>Perfil</h1>
                <p>Preview imagem</p>
            </div>
            <form className={formStyle.form_container}>
              <Input
                text="Imagem"
                type="file"
                name="image"
                handleOnChange={onFileChange}
              />
              <Input
                text="E-mail"
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                handleOnChange={handleChange}
                value={user.email || ''}
              />
              <Input
                text="Nome"
                type="text"
                name="name"
                placeholder="Digite seu nome"
                handleOnChange={handleChange}
                value={user.name || ''}
              /> 
              <Input
                text="Telefone"
                type="text"
                name="phone"
                placeholder="Digite seu telefone"
                handleOnChange={handleChange}
                value={user.phone || ''}
              />
              <Input
                text="Senha"
                type="password"
                name="password"
                placeholder="Digite seu password"
                handleOnChange={handleChange}
              />
              <Input
                text="Confirme a Senha"
                type="password"
                name="confirmpassword"
                placeholder="Confirme sua senha"
                handleOnChange={handleChange}
              />
              <input type="submit" value="Editar"/>
            </form>
        </section>
    );
}

export default Profile;