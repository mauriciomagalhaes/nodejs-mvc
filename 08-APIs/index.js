const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas - endpoints
app.post('/createproduct', (req, res) => {
    const { name, price } = req.body;
    //console.log(name, price);
    if(!name){
        return res.status(422).json({message: 'O campo nome é obrigatório'});
        return
    }

    res.status(201).json({message: `Produto ${name} foi criado com sucesso!`});
});

app.get('/', (req, res) =>{
    res.status(200).json({ message: 'Primeira rota criada com sucesso' });
});

app.listen(3000)