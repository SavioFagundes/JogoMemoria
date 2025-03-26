// Array de emojis usados no jogo
const emojis = [
    "🤡", "🤡", "🤢", "🤢", "😴", "😴",
    "🤑", "🤑", "😡", "😡", "😂", "😂",
    "😎", "😎", "😒", "😒"
  ];
  
  let abrirCards = [];
  let tentativas = 0;
  let startTime;
  let endTime;
  let musicaFundo = new Audio("src/audios/trilhaSonora.mp3");
  let somVirarCarta = new Audio("src/audios/flipcard.mp3");
  let somFimJogo = new Audio("src/audios/gameover.mp3");
  
  // Função para embaralhar os emojis
  function embaralharArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Função para criar cartas no jogo
  function criarCartas() {
    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = ""; // Limpa o jogo antes de recriar as cartas
  
    const embaralharEmojis = embaralharArray([...emojis]); // Clona e embaralha os emojis
    embaralharEmojis.forEach((emoji) => {
      let box = document.createElement("div");
      box.className = "item";
      box.innerHTML = emoji;
      box.onclick = handleClick;
      gameContainer.appendChild(box);
    });
  }
  
  // Função chamada ao clicar em uma carta
  function handleClick() {
    if (abrirCards.length < 2 && !this.classList.contains("boxOpen")) {
      somVirarCarta.play(); 
      if (!musicaFundo.playing) musicaFundo.play(); // Toca a música de fundo apenas uma vez
  
      this.classList.add("boxOpen");
      abrirCards.push(this);
  
      if (abrirCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  }
  
  // Função para verificar se as cartas combinam
  function checkMatch() {
    tentativas++;
  
    if (abrirCards[0].innerHTML === abrirCards[1].innerHTML) {
      abrirCards.forEach(card => card.classList.add("boxMatch"));
    } else {
      abrirCards.forEach(card => card.classList.remove("boxOpen"));
    }
  
    abrirCards = [];
  
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
      finalizarJogo();
    }
  }
  
  // Função para finalizar o jogo
  function finalizarJogo() {
    endTime = new Date();
    const tempoTotalSegundos = (endTime - startTime) / 1000;
  
    const pontos = calcularPontos(tempoTotalSegundos, tentativas);
  
    somFimJogo.play();
    setTimeout(() => {
      pararMusicas();
      alert(`Você venceu em ${tempoTotalSegundos.toFixed(2)} segundos com ${tentativas} tentativas!\nPontuação: ${pontos.toFixed(2)}`);
    }, 1000);
  }
  
  // Função para parar as músicas
  function pararMusicas() {
    musicaFundo.pause();
    musicaFundo.currentTime = 0;
  }
  
  // Função para calcular os pontos com base no tempo e tentativas
  function calcularPontos(tempo, tentativas) {
    const pontuacaoTempo = Math.max(100 - tempo, 0); // Garante que a pontuação não seja negativa
    const pontuacaoTentativas = Math.max(50 - tentativas, 0);
    return pontuacaoTempo + pontuacaoTentativas;
  }
  
  // Função para reiniciar o jogo
  function resetGame() {
    tentativas = 0;
    startTime = new Date();
    criarCartas();
    musicaFundo.play();
  }
  
  // Inicia o jogo ao carregar a página
  resetGame();
  