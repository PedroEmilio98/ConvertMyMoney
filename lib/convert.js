const convert = (cotacao, dolares) => cotacao * dolares;

const toMoney = (valor) => parseFloat(valor).toFixed(4);

module.exports = {
    convert,
    toMoney
}