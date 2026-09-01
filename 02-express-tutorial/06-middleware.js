const express=require('express');
const app=express();
const logger=require('./logger')
const authorize=require('./authorize')
const morgan=require('morgan')
//app.use([authorize,logger]);
//app.use(express.static('./public'));
app.use(morgan('tiny'))
app.get('/',(req,res)=>{

    res.send('Home')
})

app.get('/about',(req,res)=>{
    res.send('About');
})
app.get('/api/pdt',(req,res)=>{
    res.send('Pdt');
})
app.get('/api/item',(req,res)=>{
   // console.log(req.user)
    res.send('Item');
})

app.listen(5000,()=>{
    console.log('server is listening....')
})