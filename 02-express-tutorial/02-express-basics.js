const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.status(200).send('This is Home Page')
})
app.get('/about',(req,res)=>{
    res.status(200).send('This is About Page')
})
app.all('*',(req,res)=>{
    res.status(404).send('<h1>Resource Not Found</h1>')
})

app.listen(5000,()=>{
    console.log('server is listening ...')
})