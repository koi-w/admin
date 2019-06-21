const positionTpl = require('../views/position.hbs')

export const render = (req,res,next) => {
    res.render(positionTpl({}))
}