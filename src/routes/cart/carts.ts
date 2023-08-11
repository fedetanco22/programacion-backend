import { Router, Request, Response } from 'express';
import { CartManager } from '../../services/cart-manager/CartManager';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await cartManager.createCart();
        res.send(cart);
    } catch (error) {
        res.status(404).send('Products not found.');
    }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const carts = await cartManager.getCarts();
        res.send(carts);
    } catch (error) {
        res.status(404).send('Carts not found.');
    }
});

router.get('/:cid', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.cid;
        const cart = await cartManager.getCartById(id);
        res.send(cart);
    } catch (error) {
        res.status(404).send('Cart not found.');
    }
});

router.post('/:cid/product/:pid', async (req: Request, res: Response): Promise<void> => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const product = req.body;
        await cartManager.addProductToCart(pid, product, cid);
        res.send('Product added to cart.');
    } catch (error) {
        res.status(404).send('Product or cart not found.');
    }
});

export default router;

