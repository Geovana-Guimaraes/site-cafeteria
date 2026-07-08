const container = document.getElementById('characters-container');
const url = 'https://hp-api.onrender.com/api/characters/students';

// ADICIONADO: Objeto com descrições curtas para cada personagem principal
const descricoesPersonagens = {
    'Harry Potter': 'O Menino Que Sobreviveu, famoso por derrotar Lord Voldemort e por sua coragem inabalável.',
    'Hermione Granger': 'A bruxa mais brilhante de sua geração, conhecida por sua inteligência, lógica e lealdade.',
    'Ron Weasley': 'O melhor amigo de Harry, leal e corajoso, vindo de uma grande família de bruxos.',
    'Draco Malfoy': 'O rival de Harry na Grifinória, astuto e ambicioso, membro de uma família Puro-Sangue.',
    'Luna Lovegood': 'Uma bruxa excêntrica e única, conhecida por sua sabedoria incomum e crença no extraordinário.',
    'Neville Longbottom': 'Um bruxo inicialmente tímido que se torna um líder corajoso e herói na Batalha de Hogwarts.',
    'Cedric Diggory': 'Um aluno exemplar da Lufa-Lufa, talentoso, justo e capitão do time de Quadribol.',
    'Cho Chang': 'Uma apanhadora talentosa da Corvinal, inteligente e popular, que teve um breve romance com Harry.'
};

function carregarEstudantes() {
    fetch(url)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (listaEstudantes) {
            container.innerHTML = ''; // Limpa a tela antes de carregar

            listaEstudantes.forEach(function (estudante) {
                const nomePersonagem = estudante.name;

                // IF bem simples: Só entra se for um dos principais E se o campo image tiver link
                if (nomePersonagem === 'Harry Potter' ||
                    nomePersonagem === 'Hermione Granger' ||
                    nomePersonagem === 'Ron Weasley' ||
                    nomePersonagem === 'Draco Malfoy' ||
                    nomePersonagem === 'Luna Lovegood' ||
                    nomePersonagem === 'Neville Longbottom' ||
                    nomePersonagem === 'Cedric Diggory' ||
                    nomePersonagem === 'Cho Chang') {

                    // Segunda checagem: o personagem tem foto na API?
                    if (estudante.image !== '') {

                        // Pega a descrição correta usando o nome como chave
                        const descricao = descricoesPersonagens[nomePersonagem] || 'Estudante de Hogwarts.';

                        // Cria o HTML do card com a imagem, nome, casa e a NOVA DESCRIÇÃO
                        const cardHTML = `
                            <div class="card">
                                <img src="${estudante.image}" alt="${estudante.name}">
                                <h2>${estudante.name}</h2>
                                <p class="casa">Casa: ${estudante.house || 'Não informada'}</p>
                                <p>${descricao}</p>
                            </div>
                        `;

                        // Adiciona o card na tela
                        container.innerHTML += cardHTML;
                    }
                }
            });
        })
        .catch(function (erro) {
            console.error('Erro ao buscar os personagens:', erro);
        });
}

// Inicializa a busca assim que a página abre
carregarEstudantes();