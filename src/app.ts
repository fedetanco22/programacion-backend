const express = require('express');
import routerProducts from './routes/products/products';
import routerCarts from './routes/cart/carts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

