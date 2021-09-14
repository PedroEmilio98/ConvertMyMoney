const convert = (cotacao, dolares) => cotacao * dolares;

const toMoney = (valor) => parseFloat(valor).toFixed(2);

module.exports = {
    convert,
    toMoney
}