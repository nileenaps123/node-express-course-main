
const express=require('express');
const app=express();
const tasks=require('./routes/tasks');
const connectDB=require('./db/connect');
const notFound=require('./middleware/not-found')
const errHandler=require('./middleware/error-handler');
require('dotenv').config();
app.use(express.static('./public'))
app.use(express.json());
app.use('/api/v1/tasks',tasks)
app.use(notFound);
app.use(errHandler);
const port= process.env.PORT|| 3000
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port,console.log(`server is listening on port ${port} ....`)) 
    }catch(error){
        console.log(error)
    }
}

start();


