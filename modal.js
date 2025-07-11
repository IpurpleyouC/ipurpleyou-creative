let produtoSelecionado = {};

function abrirModal(titulo, referencia, cores, tamanhos, preco, imagem) {
  const listaCores = cores.split(",").map(c => c.trim());
  const listaTamanhos = tamanhos.split(",").map(t => t.trim());

  produtoSelecionado = {
    nome: titulo,
    referencia: referencia,
    cores: listaCores,
    tamanhos: listaTamanhos,
    preco: preco,
    imagemSelecionada: imagem
  };

  document.getElementById('modal-titulo').textContent = titulo;
  document.getElementById('modal-referencia').textContent = referencia;
  document.getElementById('modal-preco').textContent = preco;
  document.getElementById('modal-imagem').src = imagem;

  preencherSelect('selecao-cor', listaCores);
  preencherSelect('selecao-tamanho', listaTamanhos);

  document.getElementById('selecao-cor').onchange = function () {
    // imagem não muda, mas mantemos para estrutura futura
    document.getElementById('modal-imagem').src = imagem;
  };

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

document.addEventListener('DOMContentLoaded', () => {
  atualizarContador();

  const zoomImg = document.getElementById("modal-imagem");
  if (zoomImg) {
    zoomImg.addEventListener("click", () => {
      zoomImg.classList.toggle("zoomed");
    });
  }
});

