const Product=require('../models/product');

const getAllProductsStatic=async (req,res)=>{
    const search='ab'
    const products=await Product.find({price:{$gt:30}}).sort('price').select('name price')
    res.status(200).json({products,nbHits:products.length})
};

const getAllProducts=async (req,res)=>{

    const {featured,company,name,sort,fields,numericFilters}=req.query;
    const queryObj={};

    if(featured) queryObj.featured= (featured==="true")?true:false;
    if(company) queryObj.company=company;
    if(name)queryObj.name={$regex:name,$options:'i'}
    if(numericFilters){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
    }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    let query= Product.find(queryObj);
    //console.log(query)
    if(sort) {
       const sortList=sort.split(',').join(' ')
       query=query.sort(sortList);
    } else{
        query=query.sort('createAt');
    }
    if(fields) {
       const fieldsList=fields.split(',').join(' ')
       query=query.select(fieldsList);
    }
    const page=Number(req.query.page)||1;
    const limit=Number(req.query.limit)||10;
    const skip=(page-1)*limit;
    query=query.skip(skip).limit(limit);
    const products=await query;
    res.status(200).json({products,nbHits:products.length})
};

module.exports={
    getAllProductsStatic,
    getAllProducts
}