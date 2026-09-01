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
app.get('/api/v1/query',(req,res)=>{
    console.log(req.query);
    let sortedProducts=[...products];
    const {search,limit}=req.query;
    if(search){
        sortedProducts=sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }

    if(limit){
        sortedProducts=sortedProducts.slice(0,Number(limit))
        console.log(sortedProducts)
    }
    if(sortedProducts.length<1){
        //res.status(200).send('No prods found')
        return res.status(200).json({success:true,data:[]});
    }
    res.status(200).json(sortedProducts)
})
app.listen(5000,()=>{
    console.log('server is listening on port 5000.........')
})