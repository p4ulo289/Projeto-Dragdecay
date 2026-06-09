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

