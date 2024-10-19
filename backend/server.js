const express =  require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb =  require('./config/dbConnection');
const userAuth = require('./routes/userRouter');
const todoAuth = require('./routes/TodoRoutes')
const router = express.Router();
const cookieParser = require('cookie-parser');
require('dotenv').config()
const verifyJWT = require('./controller/verifyJWTtoken');

// creating express instance 
const app = express();

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// app.use(verifyJWT);

connectDb();

app.get('/',(req,res)=>{
    res.send('Hello from server, this is home page');
})
// Routes

app.use('/api/auth',userAuth);
app.use('/api/todo', verifyJWT, todoAuth);
app.get('/auth/protected', verifyJWT, (req, res)=>{
    res.json({message: 'Protected route accessed'});
});
app.get('/auth/logout', (req, res)=>{
    res.clearCookie("token");
    res.json({message: 'user logged out'});
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

