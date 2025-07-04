let produtoSelecionado = {};

function abrirModal(titulo, referencia, cores, tamanhos, preco, imagens) {
    produtoSelecionado = {
        nome: titulo,
        referencia: referencia,
        cores: cores.split(",").map(c => c.trim()),
        tamanhos: tamanhos.split(",").map(t => t.trim()),
        preco: preco,
        imagens: imagens
    };

    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal-referencia').textContent = referencia;
    document.getElementById('modal-preco').textContent = preco;

    preencherSelect('selecao-cor', produtoSelecionado.cores);
    preencherSelect('selecao-tamanho', produtoSelecionado.tamanhos);

    // Exibe a imagem da cor padrão (primeira cor)
    let corSelecionada = produtoSelecionado.cores[0];
    atualizarImagemPorCor(corSelecionada);

    // Adiciona evento para trocar a imagem ao mudar a cor
    document.getElementById('selecao-cor').onchange = function() {
        atualizarImagemPorCor(this.value);
    };

    document.getElementById('product-modal').style.display = 'block';
}

function atualizarImagemPorCor(cor) {
    // Supondo que a ordem das imagens no array bate com a ordem das cores
    let idx = produtoSelecionado.cores.findIndex(c => c.toLowerCase() === cor.toLowerCase());
    if (idx === -1) idx = 0;
    produtoSelecionado.imagemSelecionada = produtoSelecionado.imagens[idx];
    document.getElementById('modal-imagem').src = produtoSelecionado.imagemSelecionada;
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
        imagem: produtoSelecionado.imagemSelecionada
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

