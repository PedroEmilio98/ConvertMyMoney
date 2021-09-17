const express = require('express')
const path = require('path')
const convert = require('./lib/convert')
const { getDolar, urlDolar } = require('./lib/api.bc')

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


app.get('/', async (req, res) => {
    const cotacaoDolarCompra = (await getDolar(urlDolar)).cotacaoCompra
    const cotacaoDolarVenda = (await getDolar(urlDolar)).cotacaoVenda
    res.render('home', {
        error: false,
        cotacaoCompra: convert.toMoney(cotacaoDolarCompra),
        cotacaoVenda: convert.toMoney(cotacaoDolarVenda)
    })
})

app.get('/conversao', async (req, res) => {
    const cotacaoDolarCompra = (await getDolar(urlDolar)).cotacaoCompra
    const cotacaoDolarVenda = (await getDolar(urlDolar)).cotacaoVenda
    const { cotacaoManual } = req.query
    const { dolares } = req.query
    const resultadoManual = convert.convert(cotacaoManual, dolares)
    const resultadoCompra = convert.convert(cotacaoDolarCompra, dolares)
    const resultadoVenda = convert.convert(cotacaoDolarVenda, dolares)
    if (!cotacaoManual && cotacaoDolarCompra > 0 && cotacaoDolarVenda > 0 && dolares >= 0) {
        res.render('conversao', {
            error: false,
            cotacaoManual: false,
            resultadoCompra: convert.toMoney(resultadoCompra),
            resultadoVenda: convert.toMoney(resultadoVenda),
            cotacaoCompra: convert.toMoney(cotacaoDolarCompra),
            cotacaoVenda: convert.toMoney(cotacaoDolarVenda),
            dolares: convert.toMoney(dolares)
        })
    } else if (cotacaoManual) {
        res.render('conversao', {
            error: false,
            resultadoManual: convert.toMoney(resultadoManual),
            cotacaoManual: convert.toMoney(cotacaoManual),
            dolares: convert.toMoney(dolares)
        })
    } else {
        res.render('conversao', {
            error: 'resultado inválido',
        })

    }
})














