var icones = {
  trophy:   'images/trophy.svg',
  check:    'images/check-lg.svg',
  rocket:   'images/rocket-takeoff.svg',
  journals: 'images/journals.svg'
};

function criarIcone(src, className) {
  var img = document.createElement('img');
  img.src = src;
  img.className = className || 'svg-icon';
  return img;
}

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
  // Atualiza o contador e a barra de progresso
  document.getElementById('quiz-counter').textContent = '0' + numero + ' / ' + perguntas.length;

  var porcentagem = (numero / perguntas.length) * 100;
  document.getElementById('quiz-fill').style.width = porcentagem + '%';

  // Atualiza o texto da pergunta
  document.getElementById('quiz-q').textContent = dados.pergunta;

  // Limpa as opções anteriores e cria as novas
  var container = document.getElementById('quiz-opts');
  container.innerHTML = '';

  for (var i = 0; i < dados.opcoes.length; i++) {
    var botao = document.createElement('button');
    botao.className = 'quiz-opt';
    botao.textContent = dados.opcoes[i];

    // só para dar um começo no loop
    botao.setAttribute('data-indice', i);
    botao.addEventListener('click', verificarResposta);

    container.appendChild(botao);
  }

  bloqueado = false;
    }

function verificarResposta(evento) {
  if (bloqueado) return;
  bloqueado = true;

  var indiceEscolhido = parseInt(evento.target.getAttribute('data-indice'));
  var correta = perguntas[perguntaAtual].correta;
  var botoes = document.querySelectorAll('.quiz-opt');

  // Disable de todos os botoes e o destaque da resposta
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true;

    var indiceBtn = parseInt(botoes[i].getAttribute('data-indice'));
    if (indiceBtn === correta) {
      botoes[i].classList.add('correct');
      var iconeCheck = criarIcone(icones.check, 'svg-icon icon-correct');
      botoes[i].appendChild(iconeCheck);
    } else if (indiceBtn === indiceEscolhido) {
      botoes[i].classList.add('wrong');
    }
  }

  if (indiceEscolhido === correta) {
    pontuacao++;
  }

  // Timeout para a próxima pergunta
  setTimeout(function () {
    perguntaAtual++;
    exibirPergunta();
  }, 1100);
}

    function mostrarResultado() {
  document.getElementById('quiz-body').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');

  var titulo = '';
  var iconeSrc = null;

  if (pontuacao >= 9) {
    titulo = 'Excelente!';
    iconeSrc = icones.trophy;
  } else if (pontuacao >= 7) {
    titulo = 'Muito bom!';
    iconeSrc = icones.trophy;
  } else if (pontuacao >= 5) {
    titulo = 'Continue estudando!';
    iconeSrc = icones.journals;
  } else {
    titulo = 'Revise o conteúdo!';
    iconeSrc = icones.rocket;
  }

  var resultEmoji = document.getElementById('result-emoji');
  resultEmoji.innerHTML = '';

  if (iconeSrc) {
    var iconeResultado = criarIcone(iconeSrc, 'svg-icon icon-result');
    resultEmoji.appendChild(iconeResultado);
  }

  var textoResultado = document.createTextNode(' ' + titulo);
  resultEmoji.appendChild(textoResultado);

  document.getElementById('result-score').textContent = pontuacao + ' de ' + perguntas.length + ' corretas';
}

function restartQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  bloqueado = false;

  document.getElementById('quiz-body').classList.remove('hidden');
  document.getElementById('quiz-result').classList.add('hidden');

  exibirPergunta();
}

// Inicia o quiz ao carregar a página
exibirPergunta();

// Ícone journals no label do backlog
(function () {
  var labels = document.querySelectorAll('.section-label');
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].textContent.indexOf('02') !== -1) {
      var iconeJournals = criarIcone(icones.journals, 'svg-icon icon-label');
      labels[i].insertBefore(iconeJournals, labels[i].firstChild);
      break;
    }
  }
})();

