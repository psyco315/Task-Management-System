import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();

import connectDB from './database/connect.js';
import taskRouter from './routes/task.js'
import userRouter from "./routes/user.js"
import errorMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

const dbKey = process.env.DBKEY;
const app = express();
const PORT = 3000;


// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json())


// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use('/task', taskRouter)
app.use('/user', userRouter)


// Error handling
app.use(errorMiddleware)
app.use(notFoundMiddleware)


// Start server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => { console.log(`Listening to port: ${PORT}`) })
    } catch (error) {
        console.log(error)
    }
}
start()
