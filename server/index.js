import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();

import connectDB from './database/connect.js';
import taskRouter from './routes/task.js'
import userRouter from "./routes/user.js"
import adminRouter from "./routes/admin.js"
import groupRouter from "./routes/group.js"
import authRouter from "./routes/auth.js"
import errorMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

const dbKey = process.env.DBKEY;
const app = express();
const PORT = 3000;


// Middlewares
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json())


// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use('/auth', authRouter)
app.use('/task', taskRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/group', groupRouter)


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
