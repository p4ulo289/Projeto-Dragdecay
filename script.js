/* Slides */
var slideAtual = 0;
var slides = document.querySelectorAll('.slide');
var pontos = document.querySelectorAll('.ponto');

function exibirSlide(indice) {
  // Exibição dos slides
  if (indice >= slides.length) {
    slideAtual = 0;
  } else if (indice < 0) {
    slideAtual = slides.length - 1;
  } else {
    slideAtual = indice;
  }

  // remove o active

  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  for (var i = 0; i < pontos.length; i++) {
    pontos[i].classList.remove('active');
  }

  // Ativa o slide e ponto corretos
  slides[slideAtual].classList.add('active');
  pontos[slideAtual].classList.add('active');
}

function changeSlide(direcao) {
  exibirSlide(slideAtual + direcao);
}

function goToSlide(indice) {
  exibirSlide(indice);
}

// Troca do slide para 5 segundos

setInterval(function () {
  exibirSlide(slideAtual + 1);
}, 5000);

/* Quiz */

var perguntas = [
  {
    pergunta: "O que significa a sigla LEO?",
    opcoes: ["Low Earth Orbit", "Large Energy Output", "Lunar Escape Operation", "Low Emission Object"],
    correta: 0
  },
  {
    pergunta: "O que é 'lixo espacial'?",
    opcoes: ["Meteoros entrando na atmosfera", "Detritos artificiais em órbita terrestre", "Satélites ativos em LEO", "Nuvens de gás no espaço"],
    correta: 1
  },
  {
    pergunta: "Qual é o principal objetivo do DragDecay Controller?",
    opcoes: ["Lançar foguetes", "Controlar o decaimento orbital de satélites", "Monitorar o clima", "Comunicar com astronautas"],
    correta: 1
  },
  {
    pergunta: "Qual ODS da ONU está relacionado à infraestrutura e inovação tecnológica?",
    opcoes: ["ODS 7", "ODS 9", "ODS 12", "ODS 15"],
    correta: 1
  },
  {
    pergunta: "O que é uma 'vela de arrasto' em satélites?",
    opcoes: ["Um painel solar extra", "Uma antena de comunicação", "Um dispositivo para aumentar o arrasto e acelerar o decaimento", "Um motor de propulsão iônica"],
    correta: 2
  },
  {
    pergunta: "Por quanto tempo satélites devem ser removidos da órbita segundo normas internacionais?",
    opcoes: ["Em até 1 ano", "Em até 5 anos", "Em até 10 anos", "Em até 25 anos"],
    correta: 1
  },
  {
    pergunta: "O que é 'decaimento orbital'?",
    opcoes: ["Aumento da altitude de um satélite", "Redução gradual da altitude por arrasto atmosférico", "Explosão de um satélite no espaço", "Mudança de órbita para a Lua"],
    correta: 1
  },
  {
    pergunta: "O que significa 'telemetria' em sistemas espaciais?",
    opcoes: ["Envio de dados de um satélite para a Terra", "Controle remoto de robôs", "Medição da temperatura do espaço", "Comunicação entre astronautas"],
    correta: 0
  },
  {
    pergunta: "Qual é o risco principal do congestionamento orbital em LEO?",
    opcoes: ["Interferência em sinais de rádio", "Colisão entre satélites e geração de mais detritos", "Aquecimento global", "Perda de sinal GPS"],
    correta: 1
  },
  {
    pergunta: "O que é 'override manual' no contexto do DragDecay Controller?",
    opcoes: ["Reiniciar o sistema automaticamente", "Permitir que o operador em terra intervenha no controle da vela", "Atualizar o firmware do satélite", "Cancelar a missão inteira"],
    correta: 1
  }
];

var perguntaAtual = 0;
var pontuacao = 0;
var bloqueado = false;

function exibirPergunta() {
  // Verificação para o fim do quiz
  if (perguntaAtual >= perguntas.length) {
    mostrarResultado();
    return;
  }

  var dados = perguntas[perguntaAtual];
  var numero = perguntaAtual + 1;
    }