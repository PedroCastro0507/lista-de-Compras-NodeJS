import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());
let listaDeCompras = [];

//Enviar item
app.post('/item', (req, res) => {
    const nomeItem = req.body.nome;

    if (nomeItem) {
        listaDeCompras.push({ nome: nomeItem, comprado: false });
        res.status(201).send(`Item ${nomeItem} adicionado a lista.`);
    } else {
        res.status(400).send("Item inválido.");
    }
});

//Listar item
app.get('/item', (req, res) => {
    res.status(200).json(listaDeCompras);
});

//Item comprado
app.put('/item/:nome', (req, res) => {
    const nomeItem = req.params.nome;
    const item = listaDeCompras.find(item => item.nome === nomeItem);

    if (!item) {
        return res.status(404).send(`Item "${nomeItem}" não encontrado.`);
    }

    item.comprado = true;
    res.status(200).send(`Item "${nomeItem}" marcado como comprado.`);
});

//Deletar item
app.delete('/item/:nome', (req, res) => {
    const nomeItem = req.params.nome;
    const index = listaDeCompras.findIndex(item => item.nome === nomeItem)

    if (index === -1) {
        return res.status(404).send(`Item "${nomeItem}" não encontrado.`);
    }

    listaDeCompras.splice(index, 1);
    res.status(200).send(`Item "${nomeItem}" removido.`);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
