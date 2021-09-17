const express = require('express')
const path = require('path')
const convert = require('./lib/convert')
const { getDolar } = require('./lib/api.bc')

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

    const cotacaoDolarCompra = (await getDolar()).cotacaoCompra
    const cotacaoDolarVenda = (await getDolar()).cotacaoVenda
    const horaCotacao = (await getDolar()).dataHoraCotacao
    const { cotacaoManual } = req.query
    let { dolares } = req.query
    if (!dolares) {
        dolares = 1
    }
    const resultadoManual = convert.convert(cotacaoManual, dolares)
    let cotacao = 0
    if (cotacaoDolarVenda != null) {
        cotacao = cotacaoDolarVenda
    }
    let resultadoCompra = convert.convert(cotacaoDolarCompra, dolares)
    let resultadoVenda = convert.convert(cotacaoDolarVenda, dolares)
    if (cotacaoManual) {
        cotacao = cotacaoManual
        resultadoCompra = resultadoManual
        resultadoVenda = resultadoManual
    }
    if (cotacaoDolarCompra && cotacaoDolarVenda) {
        res.render('home', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            cotacaoManual: convert.toMoney(cotacaoManual),
            resultadoCompra: convert.toMoney(resultadoCompra),
            resultadoVenda: convert.toMoney(resultadoVenda),
            cotacaoCompra: convert.toMoney(cotacaoDolarCompra),
            cotacaoVenda: convert.toMoney(cotacaoDolarVenda),
            dolares: convert.toMoney(dolares),
            horaCotacao
        })
    } else {
        res.render('home', {
            error: 'resultado inválido',
            cotacao: convert.toMoney(cotacao),
            cotacaoManual: convert.toMoney(cotacaoManual),
            resultadoCompra: convert.toMoney(resultadoCompra),
            resultadoVenda: convert.toMoney(resultadoVenda),
            cotacaoCompra: convert.toMoney(cotacaoDolarCompra),
            cotacaoVenda: convert.toMoney(cotacaoDolarVenda),
            dolares: convert.toMoney(dolares),
            horaCotacao

        })

    }
})














