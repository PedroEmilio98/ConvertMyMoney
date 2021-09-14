
const { TestWatcher } = require('@jest/core')
const convert = require('./convert')

test('converte cotacao 0', () => {
    expect(convert.convert(0, 2)).toBe(0)
})

test('converte dolar 0', () => {
    expect(convert.convert(10, 0)).toBe(0)
})



