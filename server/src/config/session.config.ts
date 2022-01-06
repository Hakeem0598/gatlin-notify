import MongoStore from 'connect-mongo';

// CONNECT-MONGO CONFIG
const sessionStore =  MongoStore.create({
    mongoUrl: process.env.DB_URL || 'mongodb://localhost:27017/gatlin',
    collectionName: 'sessions'
})

// EXPRESS SESSION CONFIG
const sessionOptions = {
    store: sessionStore,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    cookie: {
        sameSite: true,
        maxAge: parseInt(process.env.SESSION_EXPIRES_IN || '2') * 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'production' ? true : false
    }
}

export default sessionOptions;
