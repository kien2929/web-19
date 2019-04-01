const express = require('express');
const bcryptjs =require('bcryptjs');
const UserModel =require('../users/models')
const authRouter =express();
//register
authRouter.post('/register',async(req,res)=>{
  try {
      const userInfo =req.body;
      const hashPassword = await bcryptjs.hash(userInfo.password,10);
      const newUser = await UserModel.create({
          ...userInfo,
          password:hashPassword
      });
      res.status(201).json(newUser);
  } catch (error) {
    res.status(500).end(error.message);
  }  
});
//login
authRouter.post('/login',async(req,res)=>{
    try {
        const loginInfo =req.body;
        //check email pass empty
        const user = await UserModel.findOne({email:loginInfo.email}).exec();

        if(!user){
            res.status(404).json({
                message:'User not found',
                success: false,
            })
        }else{
            const comparePassword = await bcryptjs.compare(
                loginInfo.password,
                user.password,
            );
            if(comparePassword){
                //sucess
                //save session storage
                req.session.user={
                    _id:user._id,
                    email:user.email,
                    permissions:user.permissions.length>0 ? user.permissions:[],
                };
                req.session.save();

                res.status(200).json({
                    message:'Login success',
                    success:true
                });
            }else{
                //false
                res.status(200).json({
                    message:'password isnt correct',
                    success:false
                })
            }
        }
    } catch (error) {
        res.status(500).end(error.message);
    }
})

authRouter.get('/test',(req,res)=>{
    console.log(req.session);
    res.status(201).end();
})
//logout
authRouter.get('/logout',async(req,res)=>{
    try {
        req.session.destroy();
        res.status(200).json({
            message:'Lo out success',
            success:true,
        })
    } catch (error) {
        res.status(500).end(error.message);
    }
})

module.exports=authRouter;