import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

// Replace __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
const PORT = process.env.PORT || 3000

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '../client/dist')));


// Middlewares
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json())


// Routes
app.get('/api/', (req, res) => {
  res.send('Hello from Express!');
});

app.use('/api/auth', authRouter)
app.use('/api/task', taskRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/group', groupRouter)


// Catch-all for frontend routing (React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


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
