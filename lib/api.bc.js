const axios = require('axios')





const getUrlDolar = () => {
    const dataCrua = new Date()
    let dia = dataCrua.getDate()
    const hora = dataCrua.getHours()
    const minutos = dataCrua.getMinutes()
    const diaSemana = dataCrua.getDay()
    if (diaSemana != 0 && diaSemana != 6 && diaSemana != 1 && (hora < 13 || (hora == 13 && minutos <= 30))) {
        dia = dia - 1
    } else if (diaSemana == 0) {
        //domingo
        dia = dia - 2
    } else if (diaSemana == 6) {
        //sabado
        dia = dia - 1
    } else if (diaSemana == 1 && (hora < 13 || (hora == 13 && minutos <= 30))) {
        //segunda antes das 13:30 -para nao pegar a de domingo-
        dia = dia - 3
    }
    const mes = dataCrua.getMonth() + 1
    const ano = dataCrua.getFullYear()
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${mes}-${dia}-${ano}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    return url
}

const getDolar = ({ getUrlDolar }) => async () => {
    const urlDolar = getUrlDolar()
    const get1 = await axios.get(urlDolar)
    let cotacaoCompra = null
    let cotacaoVenda = null
    let dataHoraCotacao = 'cotação indisponível'
    if (get1.data.value[0] != null) {
        cotacaoCompra = await get1.data.value[0].cotacaoCompra
        cotacaoVenda = await get1.data.value[0].cotacaoVenda
        dataHoraCotacao = await get1.data.value[0].dataHoraCotacao
    }
    return { cotacaoCompra, cotacaoVenda, dataHoraCotacao }


}

module.exports = {
    getDolar: getDolar({ getUrlDolar }),
    getUrlDolar,
    pure: {
        getDolar
    }
}







