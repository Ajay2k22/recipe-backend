import express from 'express';
import { APP_PORT } from './config/index.js';
const app = express()
import router from './routes/index.js';
const PORT = process.env.PORT || 3000;
import errorHandler from './middleware/errorHandler.js';
import bodyParser from 'body-parser';
import { connectDB } from './Database/connectDB.js';
import path from 'path'


global.appRoot = path.resolve(__dirname)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json());
connectDB()

// router registration
app.use('/api', router)



// global error handler
app.use(errorHandler)
// server creation
app.listen(APP_PORT, (req, res) => {
    console.log(`Server is Created at http://localhost:3000`)
})