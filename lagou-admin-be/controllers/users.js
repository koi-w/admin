const User = require('../models/user')
const bcrypt = require('bcrypt')

class UserController {

    hashPassword(pwd){
        return new Promise((resolve,reject) => {
            bcrypt.hash(pwd, 10, function(err, hash) {
                resolve(hash)
            });
        })
    }
    comparePassword(pwd,hash){
        return new Promise((resolve,reject) => {
            bcrypt.compare(pwd, hash, function(err, res) {
                resolve(res)
            });
        })
    }

    async signUp(req,res,next){
        res.set('Content-Type', 'application/json; charset=utf-8')

        User.findOne({username:req.body.username},async (err,user) => {

            if(err){
                return res.render('fail',{
                    data: JSON.stringify({
                        message: '500'
                    })
                })
            }
            if(user){
                return res.render('fail',{
                    data: JSON.stringify({
                        message: '该用户已注册'
                    })
                })
            }
            let password = await userController.hashPassword(req.body.password)
    
            new User({...req.body,password}).save((err,user) => {
                if(err){
                    return res.render('fail',{
                        data: JSON.stringify({
                            message: '500'
                        })
                    })
                }
                res.render('succ',{
                    data: JSON.stringify({
                        message: '注册成功'
                    })
                })
            })

        })



    }

    async signIn(req,res,next){
        res.set('Content-Type','application/json; charset=utf-8')

        User.findOne({username:req.body.username},async (err,user) => {
            if(err){
                return res.render('fail',{
                    data: JSON.stringify({
                        message: '500'
                    })
                })
            }
            if(!user){
                return res.render('fail',{
                    data: JSON.stringify({
                        message: '该用户不存在'
                    })
                })
            }

            let bool = await userController.comparePassword(req.body.password,user.password)
            if(!bool){
                return res.render('fail',{
                    data: JSON.stringify({
                        message: '密码错误'
                    })
                })
            }

            res.cookie('name','dm')

            req.session.username = user.username

            res.render('succ',{
                data: JSON.stringify({
                    username: user.username,
                    message: '登录成功'
                })
            })
        })
    }

    //验证是否登录
    async issignIn(req,res,next){
        res.set('Content-Type', 'application/json; charset=utf-8')

        if(req.session.username){
            return res.render('succ',{
                data: JSON.stringify({
                    isSignin: true,
                    username: req.session.username
                })
            })
        }else{
            return res.render('succ',{
                data: JSON.stringify({
                    isSignin: false,
                })
            })
        }
    }

    //注销
    signout(req,res,next){
        req.session = null
        res.render('succ',{
            data: JSON.stringify({
                isSignin: false
            })
        })
    }
}

const userController = new UserController()

module.exports = userController


//生成私钥：
// ssh-keygen -t rsa -b 2048 -f rsa_private_key.pem
//生成公钥
//openssl rsa -in rsa_private_key.pem -pubout -outform PEM -out rsa_public_key.pem