const express = require('express');

const routes = express.Router();

let produtos = require('../produtos');

function validatePrice (req, res, next) {
    const { price } = req.body;
  
    if (price && price >= 0) {
      next();
    }
  
    return res.status(400).send('Produto com preço inválido');
}

function authUser(req, res, next){
    const { user } = res.locals;

    if(user.admin){
        return next();
    }

    return res.status(403).send('Usuario não é admin');

}

function createUser(req, res, next){
    res.locals.user = {
        nome : "Matheus",
        admin : true
    }

    return next();
}
//POST para adicionar produtos
routes.post('', (req, res) => {
    const content = req.body;
    const newProducts = [...produtos, content];
    produtos = newProducts;
    res.status(201).json(produtos);
})

//PUT para modificar um desses produtos.
routes.put('/:id', (req, res) =>{
    const id = Number(req.params.id);
    const content = req.body;

    const produto = produtos.find((produto) => produto.id === id);

    if(!produto){
        return res.status(400).json({"message": "Produto não encontrado"})
    } 

    const newProducts = produtos.map((produto) => {
        if (produto.id === id){
            return content;
        }
        return produto;
    })

    produtos = newProducts;

    res.status(200).json(produtos);
})

//DELETE para deletar um desses produtos.
routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    let product = produtos.find((produto) => produto.id === id);

    if(!product){
        return res.status(400).json({"message": "Produto não encontrado"})
    } 

    produtos = produtos.filter((produto) => produto.id !== id)
    res.status(200).json(produtos);
})
 
//GET para verificar os que foram mantidos.
routes.get('', (req, res) =>{
    res.status(200).json(produtos);
});

module.exports = routes;