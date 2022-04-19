import api from '../../../utils/api';

import styles from './AddPet.module.css';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

/* Componentes */
import PetForm from '../../form/PetForms'

/* hooks */
import useFlashmessage from '../../../hooks/useFlshMessage';

function AddPet(){
    return (
        <section className={styles.addpet_header}>
            <div >
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm btnText="Cadastrar Pets" />
        </section>
    );
}

export default AddPet