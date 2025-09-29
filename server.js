const express = require('express');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const route = require('./routes/route')

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173'
}));



app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use(route);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});