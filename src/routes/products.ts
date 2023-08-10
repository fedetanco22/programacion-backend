import { Router, Request, Response } from 'express';
import { ProductManager } from '../services/ProductManager';

const router = Router();

const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit?.toString() ?? '0');

    if (limit && limit > 0 && limit <= products.length - 1) {
        let limitedProducts = products.slice(0, parseInt(limit.toString()));
        res.send(limitedProducts);
    } else {
        try {
            res.send(products);
        } catch (error) {
            res.status(404).send('Products not found.');
        }
    }
});

router.get('/:pid', async (req: Request, res: Response): Promise<void> => {
    const id = req.params.pid;
    const product = await productManager.getProductById(id);

    try {
        res.send(product);
    } catch (error) {
        res.status(404).send('Product not found.');
    }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const product = await productManager.addProduct(req.body);

    try {
        res.send(product);
    } catch (error) {
        res.status(404).send('Error when creating the product.');
    }
});

export default router;

