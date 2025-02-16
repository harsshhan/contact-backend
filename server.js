const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const router = express.Router();

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

app.listen(port,()=>(
    console.log(`Server is running on port ${port}`)
))

connectDb();
app.use(express.json());    
app.use('/api/contacts', require('./routes/contactRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler)