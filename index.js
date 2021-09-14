const express = require('express')
const path = require('path')
const convert = require('./lib/convert')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, err => {
    if (err) {
        console.log('erro ao inciar')
    } else {
        console.log('servidor no ar')
    }
})


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/conversao', (req, res) => {
    const { cotacao, dolares } = req.query
    resultado = convert.convert(cotacao, dolares)
    if (cotacao > 0 && dolares > 0) {
        res.render('conversao', {
            error: false,
            resultado: convert.toMoney(resultado),
            cotacao: convert.toMoney(cotacao),
            dolares: convert.toMoney(dolares)
        })
    } else {
        res.render('conversao', {
            error: 'resultado inválido',
        })
    }
})




