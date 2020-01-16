import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';

import routes from './routes'

const app = express();

mongoose.connect(
  'mongodb://127.0.0.1:27017/devRadar',
  {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  });

app.use(cors())
app.use(express.json())
app.use(routes)

export default app