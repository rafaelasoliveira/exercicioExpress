const express = require('express');

const app = express();

let produtos = require('./produtos');

app.use(express.json());

//POST para adicionar 4 produtos, de uma vez.
app.post('/produtos', (req, res) => {
    const content = req.body;

    const newProducts = [...produtos, ...content];

    res.status(201).json(newProducts);
})

//PUT para modificar um desses produtos.
app.put('/produtos/:id', (req, res) =>{
    const id = Number(req.params.id);
    const content = req.body;

    const produto = produtos.find((produto) => produto.id === id);

    if(!produto){
        return res.status(400).json({"message": "Produto não encontrado"})
    } 

    const newProdutos = produtos.map((produto) => {
        if (produto.id === id){
            return content;
        }
        return produto;
    })

    produtos = newProdutos;

    res.status(200).json(produtos);
})

//DELETE para deletar um desses produtos.
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    let product = produtos.find((produto) => produto.id === id);

    if(!product){
        return res.status(400).json({"message": "Produto não encontrado"})
    } 

    produtos = produtos.filter((produto) => produto.id !== id)
    res.status(200).json(produtos);
})
 
//GET para verificar os que foram mantidos.
app.get('/produtos', (req, res) =>{
    res.status(200).json(produtos);
});

app.listen(3001, ()=>{
    console.log('Servidor online');
})

