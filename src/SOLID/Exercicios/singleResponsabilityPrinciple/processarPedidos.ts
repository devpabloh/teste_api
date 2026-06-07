/* 
Essa função faz coisas demais. Quebre em funções coesas e mostre como ficaria a orquestração.

function processarPedido(itens: { preco: number; qtd: number }[], cupom?: string) {
  let total = itens.reduce((acc, i) => acc + i.preco * i.qtd, 0);
  if (cupom === "DESC10") total *= 0.9;
  const nota = `NOTA FISCAL\nTotal: R$ ${total.toFixed(2)}`;
  console.log("Enviando email com a nota...");
  return nota;
}
*/