const titulo = document.getElementById("titulo");
const texto = document.getElementById("texto");
const opcao = document.getElementById("opcao");
const proximo = document.getElementById("proximo");
const pontuacao = document.getElementById("pontuação");
const telaResultado = document.getElementById("tela-resultado");
const telaJogo = document.getElementById("tela-jogo");
const inicio = document.getElementById("inicio");
const buttunDiv = document.getElementById("button-div");
const telaInicio = document.getElementById("tela-inicio");
const temaResultado = document.getElementById("tema");
const restart = document.getElementById("restart");
const mens = document.getElementById("mensagem");
const recordeEl = document.getElementById("recorde");
const progresso = document.getElementById("progresso");
const progressoEl = document.getElementById("pergunta");

let recordes = JSON.parse(localStorage.getItem("recordes")) || {};

const temas = [
    {
        nome:"Programação",
        perguntas: [
            { pergunta: "Qual tag HTML cria um link?", opcoes: ["<p>", "<a>", "<div>", "<link>"], correta: 1 },
            { pergunta: "Qual propriedade CSS muda a cor do texto?", opcoes: ["background-color", "font-size", "color", "text-align"], correta: 2 },
            { pergunta: "Qual comando mostra algo no Console do navegador?", opcoes: ["console.log()", "print()", "alert.log()", "show()"], correta: 0 },
            { pergunta: "Qual método adiciona um item no final de uma lista?", opcoes: ["pop()", "push()", "shift()", "splice()"], correta: 1 },
            { pergunta: "O que o JSON.stringify faz?", opcoes: ["Converte texto em lista", "Apaga o localStorage", "Converte uma lista ou objeto em texto", "Busca dados da internet"], correta: 2 }
        ]
    },
    {
        nome: "Conhecimentos Gerais",
        perguntas: [
            { pergunta: "Qual é o maior planeta do Sistema Solar?", opcoes: ["Terra", "Saturno", "Júpiter", "Netuno"], correta: 2 },
            { pergunta: "Quantos estados tem o Brasil (sem contar o Distrito Federal)?", opcoes: ["24", "26", "27", "25"], correta: 1 },
            { pergunta: "Qual é a capital da Bahia?", opcoes: ["Feira de Santana", "Salvador", "Ilhéus", "Vitória da Conquista"], correta: 1 },
            { pergunta: "Qual é a fórmula química da água?", opcoes: ["CO2", "O2", "H2O", "NaCl"], correta: 2 },
            { pergunta: "Em que ano os portugueses chegaram ao Brasil?", opcoes: ["1500", "1492", "1822", "1889"], correta: 0 }
        ]
    },
    {
        nome: "Futebol",
        perguntas: [
            { pergunta: "Em que ano o Brasil ganhou sua primeira Copa do Mundo?", opcoes: ["1950", "1958", "1962", "1970"], correta: 1 },
            { pergunta: "Quantos jogadores cada time tem em campo no início da partida?", opcoes: ["10", "11", "12", "9"], correta: 1 },
            { pergunta: "Qual jogador brasileiro é conhecido como 'Rei do Futebol'?", opcoes: ["Zico", "Ronaldo", "Pelé", "Romário"], correta: 2 },
            { pergunta: "Quanto dura uma partida de futebol, sem acréscimos?", opcoes: ["80 minutos", "90 minutos", "100 minutos", "120 minutos"], correta: 1 },
            { pergunta: "Em qual país foi realizada a Copa do Mundo de 2014?", opcoes: ["Alemanha", "Rússia", "Brasil", "África do Sul"], correta: 2 }
        ]
    }
]

let tema = temas[0];
let perguntas = tema.perguntas;
let atual = 0;
let pontos = 0;

const tempoEl = document.getElementById("tempo");
let tempo = 10;
let intervalo = null;

function criarTemas(){
    temas.forEach(function (t){
        const btnTema = document.createElement("button");
        btnTema.textContent = t.nome;
        buttunDiv.appendChild(btnTema);

        btnTema.addEventListener("click", function (){
            iniciarJogo(t);
        });
    });
}

function iniciarJogo(t){
    atual = 0;
    pontos = 0;
    tema = t;
    perguntas = [...t.perguntas];

    perguntas.sort(function (){
        return Math.random() - 0.5;
    });
    
    mostrarTela(telaJogo);
    mostrarPergunta();
};

function mostrarPergunta(){
    const p = perguntas[atual];
    const de = perguntas.length;

    proximo.style.visibility = "hidden";
    progresso.style.width = `${((atual + 1) / perguntas.length) * 100}%`;
    progressoEl.textContent = `Pergunta ${atual + 1} de ${de}`;

    clearInterval(intervalo);
    tempo = 10;
    tempoEl.classList.remove("metade", "esgota");
    tempoEl.textContent = tempo;

    intervalo = setInterval(function (){
        tempo -= 1;
        tempoEl.textContent = tempo;

        if(tempo >= 4 && tempo <= 6){
            tempoEl.classList.add("metade");
        } else if(tempo <= 3){
            tempoEl.classList.remove("metade");
            tempoEl.classList.add("esgota");
        }
        if(tempo === 0) {
            clearInterval(intervalo);
            revelarResposta();
        }
    }, 1000);

    titulo.textContent = tema.nome;
    texto.textContent = p.pergunta;

    opcao.innerHTML = "";

    p.opcoes.forEach(function (op, indice) {
        const botao = document.createElement("button");
        botao.textContent = op;
        opcao.appendChild(botao);
        
        
        botao.addEventListener('click', function(){
            clearInterval(intervalo);
            if(indice !== p.correta) {
                botao.classList.add("errada");
            } else {
                pontos += 1;
            }
            revelarResposta();
        })
    });
    
};

function revelarResposta(){
    const p = perguntas[atual];
    const botoes = opcao.querySelectorAll("button");
    
    botoes[p.correta].classList.add("certa");
    botoes.forEach(function (b) {
        b.disabled = true;
    });
    proximo.style.visibility = "visible"

    if (atual === perguntas.length - 1) {
        proximo.textContent = "Ver resultado 🏁";
    } else {
        proximo.textContent = "Próximo";
    }
};

function mostrarResultado(){
    const de = perguntas.length;
    let mensagem;
    pontuacao.textContent = `Você acertou ${pontos} de ${de}!`;

    if (pontos === perguntas.length) {
        mensagem = "Perfeito! 🏆";
    } else if (pontos >= perguntas.length / 2) {
        mensagem = "Muito bem!";
    } else {
        mensagem = "Continue praticando!";
    }

    mens.textContent = mensagem;

    const recorde = recordes[tema.nome] || 0;

    if (pontos > recorde) {
        recordes[tema.nome] = pontos;
        localStorage.setItem("recordes", JSON.stringify(recordes));
        recordeEl.textContent = "🎉 Novo recorde!";
        recordeEl.classList.add("destaque");
    } else {
        recordeEl.classList.remove("destaque");
        recordeEl.textContent = `Recorde: ${recorde}`;
    }

    mostrarTela(telaResultado);
};

proximo.addEventListener("click", function(){
    atual += 1; 
    if(atual === perguntas.length){
        mostrarResultado();
    } else {
        mostrarPergunta();
    }

});

restart.addEventListener("click", function(){
    iniciarJogo(tema);
});

temaResultado.addEventListener("click", function(){
    mostrarTela(telaInicio);
});

function mostrarTela(tela) {
    telaInicio.style.display = "none";
    telaJogo.style.display = "none";
    telaResultado.style.display = "none";
    tela.style.display = "block";
}

criarTemas();
mostrarTela(telaInicio);