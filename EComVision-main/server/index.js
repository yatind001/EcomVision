import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* Data Imports */

import User from "./models/User.js";
import Product from './models/Product.js';
import ProductStat from './models/ProductStats.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStats.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction,dataOverallStat} from "./data/index.js";




/* Configuration */

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());

/* Routes */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE Setup */

const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true, 
    })

    .then(()=> {
        app.listen(PORT, () => console.log(`Server Port : ${PORT}`));

        dataUser.forEach(async (user) => {
            await User.updateOne(
                { _id: user._id }, // Assuming _id is present in user data
                user,
                { upsert: true }
            );
        });

        dataProduct.forEach(async (product) => {
            await Product.updateOne(
                { _id: product._id }, // Assuming _id is present in user data
                product,
                { upsert: true }
            );
        });

        dataProductStat.forEach(async (productStat) => {
            await ProductStat.updateOne(
                { _id: productStat._id }, // Assuming _id is present in user data
                productStat,
                { upsert: true }
            );
        });

        dataProductStat.forEach(async (productStat) => {
            await ProductStat.updateOne(
                { _id: productStat._id }, // Assuming _id is present in user data
                productStat,
                { upsert: true }
            );
        });

        dataTransaction.forEach(async (transaction) => {
            await Transaction.updateOne(
                { _id: transaction._id }, // Assuming _id is present in user data
                transaction,
                { upsert: true }
            );
        });

        dataOverallStat.forEach(async (overallstat) => {
            await OverallStat.updateOne(
                { _id: overallstat._id }, // Assuming _id is present in user data
                overallstat,
                { upsert: true }
            );
        });
    })

    .catch((error) => console.log(`${error} did not connect`));