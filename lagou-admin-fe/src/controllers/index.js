const menuTpl = require('../views/menu.hbs')
const homeTpl = require('../views/home.hbs')

import Users from './users'



export const render = (req,res,next) => {

    // 转载menu
    $('.sidebar-menu').html(menuTpl)

    // 渲染登录注册
    new Users()

    //返回路由的home页
    res.render(homeTpl({}))
}




// function render(req,res,next){
//     let template = Handlebars.compile(menuTpl)
//     let str = template({'title':'hello'})
//     $('.sidebar-menu').html(str)

//     res.render('home')
// }
// export {
//     render
// }




// import hbsTemplate from '../views/menu.hbs'

// export default function render (req, res, next) {
//     var { params, query, body } = req
  
//     // 你可以使用 handlebars 自定义 json helpers 来处理 json
//     res.render(hbsTemplate({
//       paramsStr: JSON.stringify(params),
//       queryStr: JSON.stringify(query),
//       bodyStr: JSON.stringify(body),
//       body: body
//     }))
//   }