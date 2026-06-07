/* 
Refatore separando a lógica de negócio da formatação de saída. Pense: se amanhã pedirem o mesmo relatório em JSON em vez de texto, o que deveria mudar?

class RelatorioVendas {
  constructor(private vendas: number[]) {}

  gerar(): string {
    const total = this.vendas.reduce((a, b) => a + b, 0);
    const media = total / this.vendas.length;
    return `=== RELATÓRIO ===\nTotal: ${total}\nMédia: ${media.toFixed(2)}`;
  }
}

*/