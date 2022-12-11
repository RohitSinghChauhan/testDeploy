const { Router } = require('express');

const ProductModel = require('../models/products.model');

const productRoute = Router();

productRoute.get('/', (req, res) => {
    res.send('Welcome to the products page');
});

productRoute.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const product = await ProductModel.findById(id);
        res.send(product);
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});

productRoute.post('/create', async (req, res) => {
    const data = req.body;

    try {
        await ProductModel.create(data);
        res.send({ 'msg': 'product added' });
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});

productRoute.patch('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        await ProductModel.findByIdAndUpdate({ _id: id }, data);
        res.send({ 'msg': 'product has been modified' });
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});

productRoute.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await ProductModel.findByIdAndDelete({ _id: id });
        res.send({ 'msg': 'product deleted successfully' })
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});



module.exports = productRoute;