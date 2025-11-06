import express from 'express';
import cors from 'cors';
import fileRoutesConfig from './config/fileRoutes.cjs';
import routes from './routes.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRoutesConfig);
app.use('/category-file', fileRoutesConfig);
app.use(routes);

export default app;
