const express = require('express');
const app = express();
const morgan = require('morgan');

const {readdirSync} = require('fs');
const cors = require('cors');


// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')


//middleware
app.use(morgan('dev'));
app.use(express.json({limit:'20mb'}));
app.use(cors());

// app.use('/api',authRouter)
// app.use('/api',categoryRouter)

readdirSync('./routes').map((itemRoutes)=> app.use('/api',require('./routes/'+itemRoutes)) )





app.listen(5003, () => console.log('Example app listening on port 5003!'));