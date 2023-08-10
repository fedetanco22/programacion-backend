import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    // [POST] /api/carts { id: number, products: Product[] }
    try {
        console.log(req.body);
    } catch (error) {
        res.status(404).send('Products not found.');
    }
});

export default router;

