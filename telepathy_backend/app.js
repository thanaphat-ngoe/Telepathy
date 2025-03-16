require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {app, server} = require('./utils/socket');
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const messageRouter = require('./routes/message');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

//routes
app.use('/auth', authRouter);
app.use('/message', authenticateUser, messageRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    }
    catch (error){
        console.log('Mongo URI:', process.env.MONGO_URI);
        console.log(error);
    }
}

start();
