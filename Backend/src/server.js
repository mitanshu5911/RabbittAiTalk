import './config/env.js';
import express from 'express';
import cors from 'cors';
import csvRoutes from './routes/csvRoutes.js'


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", csvRoutes);

const port = process.env.PORT||5000;

app.listen(port,()=>{
    console.log("Server is started at PORT: ", port );
})