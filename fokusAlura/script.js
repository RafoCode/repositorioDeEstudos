const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const musicaEnd = new Audio('/sons/beep.mp3');
const musicaPlay = new Audio('/sons/play.wav');
const musicaPause = new Audio('sons/pause.mp3')
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgPlay = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500
let intervaloId = null
musica.loop = true   

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    }else{
        musica.pause()
    }

} );
//alterando pelos botões 

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto');
});

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo');
})

function alterarContexto (contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){  //trocando estilo dos botoes
        contexto.classList.remove('active') //remove a classe para limpar todos os botoes 
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            focoBt.classList.add('active');
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <br> <strong class="app__title-strong"> faça uma pausa curta!</strong>`
            curtoBt.classList.add('active');
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie. <br> <strong class="app__title-strong"> faça uma pausa longa</strong>`
            longoBt.classList.add('active');
            
        
        default:
            break;
        

    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0 ){
       // musicaEnd.play()
        zerar()
        alert('tempo finalizado!');
        return;
    }
    
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        musicaPause.play()
        zerar()
        return;
        
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    imgPlay.setAttribute('src', 'imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "começar "
    intervaloId = null;
    imgPlay.setAttribute('src', 'imagens/play_arrow.png')

}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()