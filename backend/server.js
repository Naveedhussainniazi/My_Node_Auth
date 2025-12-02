// express - server step
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.routes.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});