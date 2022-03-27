const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {
    // create token
    const token = jwt.sign({
        id: user._id,
        name: user.name,
    }, "nossosupersecreto")

    // return token
    res.status(200).json({
        message: 'Usuário autenticado com sucesso!',
        token,
        userId: user._id
    })
}

module.exports = createUserToken