const express=require('express');
const app=express();
const {products}=require('./data');

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
})

app.get('/api/products',(req,res)=>{
    const newProducts=products.map(product=>{
        const {id,name,image}=product;
        return {id,name,image};
    })
    res.json(newProducts);
})

app.get('/api/products/:ProductID',(req,res)=>{
    //  console.log(req);
    //  console.log(req.params)
    const {ProductID}=req.params;
    const singleProduct=products.find((product)=>product.id===Number(ProductID))
    if(!singleProduct) res.status(404).send('Product does not exist')
    res.json(singleProduct);    
})
app.listen(5000,()=>{
    console.log('server is listening on port 5000.........')
})