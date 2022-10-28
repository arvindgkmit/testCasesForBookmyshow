const db = require("../db");
exports.isAdmin = (req,res,next)=>
{
    let id = req.auth;
    console.log(id);
    db.query("select name from Users where id = ?",[id],(err,result)=>
    {
        if(result.length==0)
        return res.status(400).json({error:"No user exist"});
        if(result[0].name!="admin")
        return res.status(403).json({message:"Admin access required"});

        next();
    });
}