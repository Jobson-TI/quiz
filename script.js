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
    perguntas = t.perguntas;
    
    mostrarTela(telaJogo);
    mostrarPergunta();
};

function mostrarPergunta(){
    const p = perguntas[atual];

    titulo.textContent = tema.nome;
    texto.textContent = p.pergunta;

    opcao.innerHTML = "";

    p.opcoes.forEach(function (op, indice) {
        const botao = document.createElement("button");
        botao.textContent = op;
        opcao.appendChild(botao);
        
        
        botao.addEventListener('click', function(){
            const botoes = opcao.querySelectorAll("button");
            if(indice !== p.correta) {
                botoes[indice].classList.add("errada");
            } else {
                pontos += 1;
            }
            botoes[p.correta].classList.add("certa");
            botoes.forEach(function (b) {
                b.disabled = true;
            });
            proximo.style.display = "block"
                
        })
    });


    
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

    mostrarTela(telaResultado);
};

proximo.addEventListener("click", function(){
    atual += 1; 
    proximo.style.display = "none";
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