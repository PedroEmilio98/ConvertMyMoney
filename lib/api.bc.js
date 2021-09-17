const axios = require('axios')

const urlDolar = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2709-16-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao';


const getDolar = async (url) => {
    const get1 = await axios.get(url)
    const cotacaoCompra = await get1.data.value[0].cotacaoCompra
    const cotacaoVenda = await get1.data.value[0].cotacaoVenda
    return { cotacaoCompra, cotacaoVenda }
}
const testeDolar = async () => {
    const cotacaoDolarVenda = (await getDolar(urlDolar)).cotacaoVenda
    console.log(cotacaoDolarVenda)
}
testeDolar()

module.exports = {
    getDolar,
    urlDolar
}







