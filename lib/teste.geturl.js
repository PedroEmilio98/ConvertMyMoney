const { default: axios } = require("axios")



const getUrl = () => {
    const dataCrua = new Date()
    let dia = dataCrua.getDate()
    const hora = dataCrua.getHours()
    if (hora < 12) {
        dia = dia - 1
    }
    const mes = dataCrua.getMonth() + 1
    const ano = dataCrua.getFullYear()
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${mes}-${dia}-${ano}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    return url
}

//getUrl()

const getInfo = async () => {
    const url = getUrl()
    const info = await (await axios.get(url)).data.value[0]
    console.log(info)
}

getInfo()
