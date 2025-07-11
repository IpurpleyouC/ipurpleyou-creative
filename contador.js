function atualizarContador() {
  const carrinho = JSON.parse(localStorage.getItem("carrinhoIPYC") || "[]");
  let total = 0;
  carrinho.forEach(p => total += p.quantidade);
  const contador = document.getElementById("contador-carrinho");
  if (contador) contador.textContent = total;
}

// Atualiza ao abrir a página
atualizarContador();

// Atualiza o contador em todas as abas quando o carrinho muda
window.addEventListener("storage", function(e) {
  if (e.key === "carrinhoIPYC") atualizarContador();
});
