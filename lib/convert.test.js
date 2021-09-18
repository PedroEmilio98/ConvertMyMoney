
const convert = require('./convert')

test('converte cotacao 0', () => {
    expect(convert.convert(0, 2)).toBe(0)
})

test('converte dolar 0', () => {
    expect(convert.convert(10, 0)).toBe(0)
})

test('toMoney sem decimal', () => {
    expect(convert.toMoney(10)).toBe('10.0000')
})
test('toMoney com menos de 4 decimal', () => {
    expect(convert.toMoney(10.111)).toBe('10.1110')
})
test('toMoney com 4 decimal', () => {
    expect(convert.toMoney(10.1111)).toBe('10.1111')
})
test('toMoney com mais de 4 decimal', () => {
    expect(convert.toMoney(10.11111)).toBe('10.1111')
})





