import { Router, Request, Response } from 'express';
import { ProductManager } from '../../services/product-manager/ProductManager';
import { AppErrors } from '../../utils/custom-errors';

const router = Router();

const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productManager.getProducts();
        const limit = parseInt(req.query.limit?.toString() ?? '0');

        if (limit && limit > 0 && limit <= products.length - 1) {
            let limitedProducts = products.slice(0, parseInt(limit.toString()));
            res.send(limitedProducts);
        } else {
            res.send(products);
        }
    } catch (error) {
        if (error instanceof AppErrors) {
            res.status(400).send(error.message); // Bad Request
        } else {
            console.error(error); // Log other unexpected errors
            res.status(500).send('An error occurred.');
        }
    }
});

router.get('/:pid', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.pid;
        const product = await productManager.getProductById(id);
        res.send(product);
    } catch (error) {
        if (error instanceof AppErrors) {
            res.status(400).send(error.message); // Bad Request
        } else {
            console.error(error); // Log other unexpected errors
            res.status(404).send('Product not found.');
        }
    }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await productManager.addProduct(req.body);
        res.send(product);
    } catch (error) {
        if (error instanceof AppErrors) {
            res.status(400).send(error.message); // Bad Request
        } else {
            console.error(error); // Log other unexpected errors
            res.status(500).send('Error when creating the product.');
        }
    }
});

router.delete('/:pid', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.pid;
        await productManager.deleteProduct(id);
        res.send('Product deleted.');
    } catch (error) {
        if (error instanceof AppErrors) {
            res.status(400).send(error.message); // Bad Request
        } else {
            console.error(error); // Log other unexpected errors
            res.status(404).send('Product not found.');
        }
    }
});

export default router;

