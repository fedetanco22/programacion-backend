import * as express from 'express';
import { ProductManager } from './src/services/ProductManager';

const app = express();

const productManager = new ProductManager('./src/data/products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res): Promise<void> => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit?.toString() ?? '0');

    if (limit && limit > 0 && limit <= products.length - 1) {
        let limitedProducts = products.slice(0, parseInt(limit.toString()));
        res.send(limitedProducts);
    } else {
        try {
            res.send(products);
        } catch (error) {
            res.status(404).send('Product not found.');
        }
    }
});

app.get('/products', async (req, res): Promise<void> => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit?.toString() ?? '0');

    if (limit && limit > 0 && limit <= products.length - 1) {
        let limitedProducts = products.slice(0, parseInt(limit.toString()));
        res.send(limitedProducts);
    } else {
        try {
            res.send(products);
        } catch (error) {
            res.status(404).send('Product not found.');
        }
    }
});

app.get('/products/:pid', async (req, res): Promise<void> => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);

    try {
        res.send(product);
    } catch (error) {
        res.status(404).send('Product not found.');
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

