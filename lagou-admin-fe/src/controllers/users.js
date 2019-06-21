const userTpl = require('../views/user.html')

import Ajax from '../utils/ajax'


class Users {

    constructor(){
        this._renderUserTpl({isSignin : false})
        // this._signup()
        // this._signin()

    }

    //渲染登录注册按钮
    _renderUserTpl({isSignin = false,username = ''}) {

        //认证
        $.ajax({
            url: '/api/users/issignin',
            success: (res) => {
                let template = Handlebars.compile(userTpl)
                let str = template({
                    isSignin: res.data.isSignin,
                    username: res.data.username
                })
                $('.user-menu').html(str)
                this._user()
            }
        })
    }

    //渲染user模板，绑定登录注册事件
    _user() {
        let that = this

        $('.user-menu').on('click','#signout',() => {
            console.log(0)
            $.ajax({
                url: '/api/users/signout',
                success: (res) => {
                    location.reload()
                }
            })
        })


        $('#user').on('click', 'span', function(e){
            // e.stopPropagation()
            if ($(this).attr('id') == 'user-signin') {
                $('.box-title').html('登录')
                that._dosign('/api/users/signin','signin')

            } else {
                $('.box-title').html('注册')
                that._dosign('/api/users/signup','signup')
            }

        })
    }

    //登录注册请求
    _dosign(url,type){
        $('#confirm').off('click').on('click', () => {
            $.ajax({
                url,
                type: 'POST',
                data: $('#user-form').serialize(),
                success: (res) => {

                    if(type === 'signin'){
                        alert(res.data.message)
                        this._signInSucc(res)
                        return
                    }
                    alert(res.data.message)
                }
            })
            
            // let res = await Ajax.xhrPost('/api/users/signup',$('#user-form').serialize())
            // console.log(JSON.parse(res))
    
    
            // var data = $('#user-form').serialize()
            // var xhr = new XMLHttpRequest()
            // xhr.open('POST','/api/users/signup')
            // xhr.onreadystatechange = function(){
            //     if(xhr.readyState === 4 && xhr.status === 200){
            //         console.log(xhr.responseText)
            //     }
            // }
            // xhr.send(data)
    
        })
    }

    //登录成功
    _signInSucc(res){
        if(res.ret){
            this._renderUserTpl({isSignin:true,username:res.data.username})
        }
    }

}

export default Users