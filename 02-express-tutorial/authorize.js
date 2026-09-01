const authorize=(req,res,next)=>{
   // Ignore DevTools and favicon requests
    if (req.url.includes('appspecific') || req.url === '/favicon.ico') {
        return next();
    }
    const {user}=req.query;
    if(user=='john'){
        req.user={name:'john',id:3};
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
  ;
}

module.exports=authorize;