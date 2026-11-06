# Quiz 🧠🎮

Um jogo de perguntas e respostas com vários temas, temporizador e recordes, feito com HTML, CSS e JavaScript puro.

🔗 **Jogue:** https://SEU_USUARIO.github.io/quiz

## Funcionalidades

- **Vários temas** para escolher: Programação, Conhecimentos Gerais e Futebol
- Os botões de tema são **gerados automaticamente** a partir dos dados: adicionar um tema novo é só incluir ele na lista
- **Perguntas embaralhadas** a cada partida
- **Temporizador** de 10 segundos por pergunta, que muda de cor quando o tempo está acabando
- Mostra a **resposta certa** depois de cada pergunta (em verde) e destaca o erro (em vermelho)
- **Barra de progresso** e contador "Pergunta X de Y"
- **Pontuação final** com mensagem de acordo com o desempenho
- **Recorde por tema**, salvo no navegador
- Opções de **jogar de novo** ou **trocar de tema**

## Tecnologias

- HTML
- CSS (Grid, Flexbox, variáveis CSS, animações e transições)
- JavaScript (`setInterval`, `sort`, eventos, manipulação do DOM)
- localStorage + JSON

## Como funciona

As perguntas ficam numa estrutura de dados com três níveis: uma lista de **temas**, cada tema com uma lista de **perguntas**, e cada pergunta com uma lista de **opções** e o índice da resposta correta.

O jogo tem três telas (início, jogo e resultado), controladas por uma função que mostra uma e esconde as outras. O estado da partida fica em variáveis (`tema`, `perguntas`, `atual`, `pontos`), e cada pergunta é desenhada a partir delas.

## O que aprendi

- Organizar dados aninhados (listas de objetos com listas dentro)
- Controlar o fluxo de um jogo com telas e variáveis de estado
- Usar `setInterval` e `clearInterval`, evitando timers empilhados
- Copiar listas com `[...lista]` e embaralhar com `sort`
- Usar objetos como "dicionário" para salvar recordes por tema
- CSS Grid, `transform`, `visibility` vs `display`, e especificidade com `:not()`
- Reaproveitar código com funções (`revelarResposta`, `mostrarTela`)