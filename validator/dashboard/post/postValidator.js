const { body } = require('express-validator')
const cheerio = require('cheerio')

module.exports = [
    body('tittle')
        .not().isEmpty().withMessage('Tittle Can Not Be Empty')
        .isLength({ max: 100 }).withMessage('Tittle Can not be greater than 100 chars')
        .trim()
    ,
    body('body')
        .not().isEmpty().withMessage('Body can not be empty')
        .custom(value => {
            let node = cheerio.load(value)
            let text = node.text()

            if(text.length > 5000) {
                throw new Error('Body can not be greater than 5000 chars')
            }
            
            return true
        })

]