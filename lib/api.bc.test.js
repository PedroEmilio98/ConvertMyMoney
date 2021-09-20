const api = require('./api.bc')
const axios = require('axios')
const MockDate = require('mockdate');
const { getUrlDolar } = require('./api.bc');
const apiBc = require('./api.bc');

jest.mock('axios')

test("getDolar hora maior que 13", () => {
    MockDate.set('Tue 9 14 2021 14:01:14');
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-14-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar hora menor que 13", () => {
    MockDate.set('Tue 9 14 2021 12:01:14')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-13-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar hora igual a 13:30", () => {
    MockDate.set('Tue 9 14 2021 13:30:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-13-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar hora menor que 13:30 maior que 13", () => {
    MockDate.set('Tue 9 14 2021 13:29:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-13-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar hora maior que 13:30 menor que 14", () => {
    MockDate.set('Tue 9 14 2021 13:31:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-14-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar sabado apos 13:30", () => {
    MockDate.set('9 11 2021 13:31:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-10-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar sabado antes 13:30", () => {
    MockDate.set('9 11 2021 13:29:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-10-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar domingo apos 13:30", () => {
    MockDate.set('9 12 2021 13:31:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-10-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar domingo antes 13:30", () => {
    MockDate.set('9 12 2021 13:29:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-10-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar sabado exatamente 13:30", () => {
    MockDate.set('9 11 2021 13:30:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-10-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar domingo exatamente 13:30", () => {
    MockDate.set('9 12 2021 13:30:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-10-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar segunda antes 13:30", () => {
    MockDate.set('9 13 2021 13:29:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-10-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

MockDate.reset();
test("getDolar segunda exatamente 13:30", () => {
    MockDate.set('9 13 2021 13:30:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-10-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

MockDate.reset();
test("getDolar segunda após 13:30", () => {
    MockDate.set('9 13 2021 13:31:00')
    expect(api.getUrlDolar()).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%279-13-2021%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})
MockDate.reset();

test("getDolar funcionando", () => {
    const res = {
        data: {
            value: [
                {
                    cotacaoVenda: 2.00,
                    cotacaoCompra: 2.10,
                    dataHoraCotacao: '2021-09-20 13:09:20.651'
                }
            ]

        }
    }
    const getUrlDolar = jest.fn()
    getUrlDolar.mockReturnValue('url')
    axios.get.mockResolvedValue(res)
    apiBc.pure.getDolar({ getUrlDolar })()
        .then(resp => expect(resp).toBe({
            cotacaoCompra: 2.10,
            cotacaoVenda: 2.00,
            dataHoraCotacao: '2021-09-20 13:09:20.651'
        }))

})

test("getDolar fora do ar", () => {
    const res = {
        data: {
            value: [
                null
            ]

        }
    }
    const getUrlDolar = jest.fn()
    getUrlDolar.mockReturnValue('url')
    axios.get.mockResolvedValue(res)
    apiBc.pure.getDolar({ getUrlDolar })()
        .then(resp => expect(resp).toBe({
            cotacaoCompra: null,
            cotacaoVenda: null,
            dataHoraCotacao: 'cotacao indisponível'
        }))

})
