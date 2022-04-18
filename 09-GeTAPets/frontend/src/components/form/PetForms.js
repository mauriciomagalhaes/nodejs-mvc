import { useState } from 'react';

import formStyles from './Form.module.css';

import Input from './Input';

function PetForm(handleSubmit, petData, btnText){

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

    function onFileChange(e){}

    function handleChange(e){}

    return (
        <form className={formStyles.form_container}>
            <Input 
                text='Imagens do pet'
                type='file'
                name='images'
                handleOnChange={onFileChange}
            />
            <Input 
                text='Nome do pet'
                type='text'
                name='name'
                placeholder="Nome do pet"
                handleOnChange={handleChange}
                value={pet.name || ''}
            />
            <Input 
                text='Idade do pet'
                type='text'
                name='age'
                placeholder="Idade do pet"
                handleOnChange={handleChange}
                value={pet.age || ''}
            />
            <Input 
                text='Peso do pet'
                type='text'
                name='weight'
                placeholder="Peso do pet"
                handleOnChange={handleChange}
                value={pet.weight || ''}
            />
            <input type="submit" value={btnText}/>
        </form>
    );
}

export default PetForm;