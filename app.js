const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// список товаров
let products = [
    { id: 1, name: "Ноутбук", price: 50000 },
    { id: 2, name: "Телефон", price: 30000 }
];

// получить все товары
app.get('/products', (req, res) => {
    res.json(products);
});

// получить товар по id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    res.json(product);
});

// добавить товар
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: Date.now(),
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// изменить товар
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);

    if (!product) return res.status(404).send("Товар не найден");

    const { name, price } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;

    res.json(product);
});

// удалить товар
app.delete('/products/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.send("Товар удалён");
});

app.listen(port, () => {
    console.log(`Сервер запущен http://localhost:${port}`);
});