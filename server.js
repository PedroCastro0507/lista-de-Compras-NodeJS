import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());
let listaDeCompras = [];

//Enviar item
app.post('/item', (req, res) => {
    const item = req.body.item;
    if (item) {
        listaDeCompras.push(item);
        res.status(201).send(`Item ${item} adicionado a lista.`);
    } else {
        res.status(400).send("Item inválido.");
    }
});

//Listar item
app.get('/item', (req, res) => {
    res.status(200).json(listaDeCompras);
});

//Deletar item
app.delete('/item:nome', (req, res) => {
    const nomeItem = req.params.nome;

    listaDeCompras.pop();
    res.status(202).send("Item removido.")
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
