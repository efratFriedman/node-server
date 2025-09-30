const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const route = require('./routes/route');
const { isAuthorized } = require('./routes/middlewares');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true,
}));
app.use(express.json());


app.use('/api/products',isAuthorized, productsRouter);
app.use('/api/auth', authRouter);
app.use(route);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});