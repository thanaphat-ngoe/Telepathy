import 'express-async-errors';
import { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import MongoStore from 'connect-mongo';

import databaseConfig from './config/databaseConfig.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import './config/passportConfig.js';

import { notFound } from './middlewares/not-found.js';
import { errorHandlingMiddleware } from './middlewares/error-handler.js';
import { isAuthenticated } from './middlewares/authMiddlewares.js';
import { app, server } from './utils/socket.js';

dotenv.config();
databaseConfig();

// CORS configuration
app.use(
    cors({
        origin: ['http://localhost:3001'],
        credentials: true,
    })
);

// Middleware
app.use(json({ limit: '100mb' }));
app.use(urlencoded({ limit: '100mb', extended: true }));

// Secure Session Configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'session',
            ttl: 24 * 60 * 60, // 1 day
            autoRemove: 'interval',
            autoRemoveInterval: 10, // every 10 minutes
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: process.env.NODE_ENV === 'production',
            httpOnly: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        },
    })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', isAuthenticated, messageRoutes);
app.use('/api/chats', isAuthenticated, chatRoutes);

// Not found and error handling middleware
app.use(notFound);
app.use(errorHandlingMiddleware);

// Start Application
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${ process.env.NODE_ENV || 'development' } mode`);
});