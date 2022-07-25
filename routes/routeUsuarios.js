const express = require('express');

const routes = express.Router();

let usuarios = require('../users');

//POST para adicionar usuarios.
routes.post('', (req, res) => {
    const content = req.body;
    const newUsuarios = [...usuarios, content];
    usuarios = newUsuarios;
    res.status(201).json(usuarios);
})

//PUT para modificar um desses usuarios.
routes.put('/:username', (req, res) =>{
    const username = req.params.username;
    const content = req.body;

    const usuario = usuarios.find((usuario) => usuario.username === username);

    if(!usuario){
        return res.status(400).json({"message": "Usuario não encontrado"})
    } 

    const newUsuarios = usuarios.map((usuario) => {
        if (usuario.username === username){
            return content;
        }
        return usuario;
    })

    usuarios = newUsuarios;

    res.status(200).json(usuarios);
})

//DELETE para deletar um desses usuarios.
routes.delete('/:username', (req, res) => {
    const username = req.params.username;
    let usuario = usuarios.find((usuario) => usuario.username === username);

    if(!usuario){
        return res.status(400).json({"message": "Usuario não encontrado"})
    } 

    usuarios = usuarios.filter((usuario) => usuario.username !== username)
    res.status(200).json(usuarios);
})
 
//GET para verificar os que foram mantidos.
routes.get('', (req, res) =>{
    res.status(200).json(usuarios);
});

module.exports = routes;