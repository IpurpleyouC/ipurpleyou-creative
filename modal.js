let produtoSelecionado = {};

// Associe as cores ao caminho das imagens (adicione mais produtos se quiser)
let imagensPorCor = {
    "Branca": "assets/bts-cerejeira-branca.png",
    "Preta": "assets/bts-cerejeira-preta.png",
    "Verde Militar": "assets/bts-cerejeira-verde.png"
};

function abrirModal(titulo, referencia, cores, tamanhos, preco, imagemBase) {
    produtoSelecionado = {
        nome: titulo,
        referencia: referencia,
        cores: cores.split(",").map(c => c.trim()),
        tamanhos: tamanhos.split(",").map(t => t.trim()),
        preco: preco,
        imagemBase: imagemBase
    };

    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal-referencia').textContent = referencia;
    document.getElementById('modal-preco').textContent = preco;

    preencherSelect('selecao-cor', produtoSelecionado.cores);
    preencherSelect('selecao-tamanho', produtoSelecionado.tamanhos);

    // Exibe a imagem inicial (primeira cor)
    let corInicial = produtoSelecionado.cores[0];
    document.getElementById('selecao-cor').value = corInicial;
    document.getElementById('modal-imagem').src = imagensPorCor[corInicial] || imagemBase;

    document.getElementById('product-modal').style.display = 'block';
}

function preencherSelect(id, opcoes) {
    const select = document.getElementById(id);
    select.innerHTML = "";
    opcoes.forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao;
        option.textContent = opcao;
        select.appendChild(option);
    });
}

// Troca a imagem do produto conforme a cor escolhida
function trocarImagemCor() {
    const cor = document.getElementById('selecao-cor').value;
    document.getElementById('modal-imagem').src = imagensPorCor[cor] || produtoSelecionado.imagemBase;
}

function fecharModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function adicionarProdutoAoCarrinho() {
    const corSelecionada = document.getElementById('selecao-cor').value;
    const tamanhoSelecionado = document.getElementById('selecao-tamanho').value;

    let carrinho = JSON.parse(localStorage.getItem('carrinhoItems') || '[]');

    carrinho.push({
        nome: produtoSelecionado.nome,
        referencia: produtoSelecionado.referencia,
        cor: corSelecionada,
        tamanho: tamanhoSelecionado,
        preco: produtoSelecionado.preco,
        imagem: imagensPorCor[corSelecionada] || produtoSelecionado.imagemBase
    });

    localStorage.setItem('carrinhoItems', JSON.stringify(carrinho));
    fecharModal();
    atualizarContador();
}

function atualizarContador() {
    const carrinho = JSON.parse(localStorage.getItem('carrinhoItems') || '[]');
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

document.addEventListener('DOMContentLoaded', atualizarContador);

