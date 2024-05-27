const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user-routes');
const companyRouter = require('./routes/company-routes');
const tovarsouter = require('./routes/tovars-routes');
const zakazRouter = require('./routes/zakaz-routes');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swagger');
const path = require('path');

const PORT = process.env.PORT || 5050;
const app = express();
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));


app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/tovars', tovarsouter);
app.use('/api/zakaz', zakazRouter);
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));