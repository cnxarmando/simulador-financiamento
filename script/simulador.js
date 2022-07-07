import { Financiamento } from './financiamento.js'
import { FinanciamentoCarencia } from './financiamentocarencia.js'

const corpoTabela = document.querySelector('#corpoTabela')
const comCarencia = document.querySelector('#comCarencia')
const listaSuspensa = document.querySelector('#listaSuspensa')
const botaoCalcular = document.querySelector('#botaoCalcular')

const formulario = document.querySelector('#formulario')
const textoValor = document.querySelector('#textoValor')
const textoEntrada = document.querySelector('#textoEntrada')
const textoJuros = document.querySelector('#textoJuros')
const textoPrazo = document.querySelector('#textoPrazo')

function limparTabela() {
  while (corpoTabela.firstChild) {
    corpoTabela.removeChild(corpoTabela.firstChild)
  }
}

comCarencia.addEventListener('change', function () {
  if (this.checked) {
    listaSuspensa.removeAttribute('hidden')
  } else {
    listaSuspensa.setAttribute('hidden', 'hidden')
  }
})

formulario.addEventListener('submit', event => {
  event.preventDefault()
  limparTabela()
  const valor = parseFloat(textoValor.value)
  const entrada = parseFloat(textoEntrada.value)
  if (isNaN(entrada)) {
    entrada = 0
  }
  const taxaJuros = parseFloat(textoJuros.value)
  const prazo = parseFloat(textoPrazo.value)

  let simulacao
  if (comCarencia.checked) {
    const carencia = parseInt(listaSuspensa.value)
    simulacao = new FinanciamentoCarencia(
      valor,
      entrada,
      taxaJuros,
      prazo,
      carencia
    )
  } else {
    simulacao = new Financiamento(valor, entrada, taxaJuros, prazo)
  }

  simulacao.calcParcelasMensais()
  simulacao.exibirParcelas()
})
