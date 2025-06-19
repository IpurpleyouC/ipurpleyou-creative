let produtoSelecionado = {};

function abrirModal(titulo, referencia, cores, tamanhos, preco, imagem) {
    produtoSelecionado = {
        nome: titulo,
        referencia: referencia,
        cor: cores,
        tamanho: tamanhos,
        preco: preco
    };

    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal-referencia').textContent = referencia;
    document.getElementById('modal-cores').textContent = cores;
    document.getElementById('modal-tamanhos').textContent = tamanhos;
    document.getElementById('modal-preco').textContent = preco;
    document.getElementById('modal-imagem').src = imagem;

    document.getElementById('product-modal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function adicionarProdutoAoCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoItems') || '[]');
    carrinho.push(produtoSelecionado);
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
