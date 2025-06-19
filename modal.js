<!-- Modal -->
<div id="product-modal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="fecharModal()">&times;</span>
        <img id="modal-imagem" src="" alt="Imagem do Produto">
        <h2 id="modal-titulo"></h2>
        <p><strong>Referência:</strong> <span id="modal-referencia"></span></p>

        <label for="selecao-cor"><strong>Cores:</strong></label>
        <select id="selecao-cor"></select>

        <label for="selecao-tamanho"><strong>Tamanhos:</strong></label>
        <select id="selecao-tamanho"></select>

        <p><strong>Preço:</strong> R$ <span id="modal-preco"></span></p>
        <button onclick="adicionarProdutoAoCarrinho()">Adicionar ao Carrinho</button>
    </div>
</div>

