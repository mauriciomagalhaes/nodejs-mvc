import { useState, useEffect } from 'react';

function MyPets(){

    const [pets, setPets] = useState([])

    return (
        <section>
            <h1>MyPets</h1>
            <div>
                {pets.length > 0 && <p>Meus Pets cadastrados</p>}
                {pets.lenght === 0 && <p>Não há pets cadastrados</p>}
            </div>
        </section>
    );
}

export default MyPets;