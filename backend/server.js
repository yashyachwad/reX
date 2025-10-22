const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes')
const path = require('path');
const resumeRoutes = require('./routes/resumeRoutes');


dotenv.config();
// connect  DB
 connectDB();

const app = express();
const PORT = process.env.PORT || 4000;


// ✅ Proper CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://rex-frontend-pf7l.onrender.com',
 'https://rex-frontend.onrender.com' 
];

app.use(cors({
  origin: ['https://rex-frontend.onrender.com', 'https://rex-frontend-pf7l.onrender.com'], // your deployed frontend
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));


// Middleware
app.use(express.json());
//app.use(cors());  app.use(cors());


app.use('/uploads',
    express.static(path.join(__dirname, 'uploads'), {
        setHeaders : (res, _path) =>{
res.set('Access-Control-Allow-Origin', 'https://rex-frontend.onrender.com')
        }
    })
)

app.use('/api', userRouter);
app.use('/api/resume', resumeRoutes);




// routes
app.get('/' ,(req,res)=>{
    console.log("Api called");
    res.send("Api Working");
})

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(` Resume Working on http://localhost:${PORT} and http://172.16.8.77:${PORT} `);
})

