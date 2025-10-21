const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes')
const path = require('path');
const resumeRoutes = require('./routes/resumeRoutes');


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', userRouter);
app.use('/api/resume', resumeRoutes);

app.use('/uploads',
    express.static(path.join(__dirname, 'uploads'), {
        setHeaders : (res, _path) =>{
res.set('Access-Control-Allow-Origin', 'http://localhost:5173')
        }
    })
)

// connect  DB
 connectDB();



// routes
app.get('/' ,(req,res)=>{
    console.log("Api called");
    res.send("Api Working");
})

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(` Resume Working on http://localhost:${PORT} and http://172.16.8.77:${PORT} `);
})

