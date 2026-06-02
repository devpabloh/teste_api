// Single Responsability principle (principio de responsabilidade única) - S

interface Iusuario {
    nome: string
    email: string
    telefone: number
}

interface IvalidarUsuario extends Pick<Iusuario, "email">{}

class ValidadorDeUsuario {
    validar({email} : IvalidarUsuario){
        if(!email.includes("@")){
            throw new Error("E-mail inválido")
        }
    }
}

class RepositorioDeUsuario{
    salvar(dados: Iusuario){
        console.log("Usuário salvo no banco de dado... ", dados)
    }
}

class ServiceEmail{
    enviarBoasVindas(dados: Iusuario){
        console.log("Enviando e-mail de boas vindas para", dados.email)
    }
}

const validadorDeUsuario = new ValidadorDeUsuario()

validadorDeUsuario.validar({email:"pablohenriqueadm94@gmail.com"})

const repositorioDeUsuario = new RepositorioDeUsuario()

repositorioDeUsuario.salvar({
    email: "Pablo Henrique Ferreira de França",
    nome: "Pablo Henrique",
    telefone:34326678
})

// forma errada de fazer

class calcularDescontos {
    calcular(valor: number, tipoAssinatura: string): number{
        if(tipoAssinatura === 'basico'){
            return valor * 0.95;
        }else if(tipoAssinatura === 'premium'){
            return valor * 0.85;
        }

        return valor
    }
}

// forma certa de fazer utilizando O - Open/Closed Principle (princípio do aberto e fechado) - entidades de software (classes, modulos, funções) devem ser abertas para extensão, mas fechadas para modificação

/* 
    O que isso quer dizer na prática? Significa que você deve conseguir adicionar novos comportamentos ou funcionalidades ao seu sistema sem precisar alterar o código que já existe e que já está funcionando. Em vez de modificar o que já está lá, você estende o comportamento criando código novo.
*/

interface IRegraDeDesconto {
    aplicarDesconto(valor: number):number
}

class DescontoBasico implements IRegraDeDesconto {
    aplicarDesconto(valor: number): number {
        return valor * 0.95
    }
}

class DescontoPremium implements IRegraDeDesconto{
    aplicarDesconto(valor: number): number {
        return valor * 0.85
    }
}

class DescontoVip implements IRegraDeDesconto{
    aplicarDesconto(valor: number): number {
        return valor * 0.75
    }
}

class CalculadoraDeDescontos{
    calcular(valor: number, regra: IRegraDeDesconto): number{
        return regra.aplicarDesconto(valor)
    }
}

const calculadoraDeDescontos = new CalculadoraDeDescontos()
const desconto = new DescontoPremium()

const resultado = calculadoraDeDescontos.calcular(1000, desconto )

console.log(resultado)

interface IRegraDisivao {
    dividirPor(valor: number): number
}

class metade implements IRegraDisivao{
    dividirPor(valor: number): number {
        return valor / 2
    }
}

class CalcularDivisao{
    calcular(valor: number, n: IRegraDisivao){
        return n.dividirPor(valor)
    }
}

const calcularDivisao = new CalcularDivisao()
const quantidade = new metade()

const resultadoDivisao = calcularDivisao.calcular(1000, quantidade)

console.log(resultadoDivisao)

/* 
I - Interface Segregation Principle (Princípio da Segregação da Interface)
O Conceito:
Uma classe não deve ser forçada a implementar interfaces (contratos) e métodos que ela não vai usar.

Em resumo: é muito melhor ter vários contratos pequenos e específicos do que ter um contrato gigante "faz-tudo". Se você cria uma interface com 10 métodos, mas uma classe só precisa de 2, você está forçando essa classe a carregar peso morto (e provavelmente a criar métodos vazios ou lançar erros).

Exemplo Prático (em TypeScript):

Imagine que no sistema da sua empresa, você precisa criar uma rotina para os trabalhadores.
*/

// Como NÃO fazer (Contrato gigante e genérico):
interface ITrabalhador {
    trabalhar(): void
    receberSalario():void
    tirarFerias(): void
}

class Desenvolvedor implements ITrabalhador{
    trabalhar(): void {
        console.log("Escrevendo código...")
    }

    receberSalario(): void {
        console.log("Recebendo pix...")
    }

    tirarFerias(): void {
        console.log("Indo para praia")
    }
}

class RoboAutomacao implements ITrabalhador {
    trabalhar(): void {
        console.log("Rodando scripts em background...")
    }

    receberSalario(): void {
        throw new Error("Robôs não recebem salário...")
    }

    tirarFerias(): void {
        throw new Error("Robôs não tiram férias...")
    }
}

/* 

Percebe como o RoboDeAutomacao foi obrigado a assinar um contrato que não faz sentido para ele? Pior ainda: ao lançar esses erros, ele acabou de violar o princípio de Liskov (L) que vimos antes, porque o sistema espera que todo Trabalhador possa tirar férias.

Como FAZER (Segregando as Interfaces):
Nós quebramos aquele contrato grande em contratos menores e bem definidos.

*/

// Contratos pequenos e específicos
interface Trabalhador {
    trabalhar(): void
}

interface remuneravel {
    receberSalario(): void
}

interface TemDireitosTrabalhistas {
    tirarFerias(): void
}

// O desenvolvedor é um ser humano, então ele assina todos os contratos que fazem sentido   
class Dev implements Trabalhador, remuneravel, TemDireitosTrabalhistas {
    trabalhar(): void {
        console.log("Escrevendo código...")
    }

    receberSalario(): void {
        console.log("Recebendo pix...")
    }

    tirarFerias(): void {
        console.log("Indo para a praia...")
    }
}

// O robô assina APENAS o contrato que diz respeito a ele
class robo implements Trabalhador{
    trabalhar(): void {
        console.log("Rodando script em background ...")
    }
}


/* 

D - Dependency Inversion Principle (Princípio da Inversão de Dependência)

O Conceito:

Módulos de alto nível (as regras de negócio do seu sistema) não devem depender de módulos de baixo nível (banco de dados, frameworks, bibliotecas externas). Ambos devem depender de abstrações (interfaces).

Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

Em português claro: Seu código principal não deve ficar "amarrado" a nenhuma ferramenta externa. Em vez da sua classe criar (instanciar) a ferramenta que ela vai usar, ela deve apenas dizer: "Eu preciso de algo que cumpra esse contrato". Quem for usar a classe é que "injeta" a ferramenta lá dentro. É por isso que chamamos muito isso de Injeção de Dependência.

Exemplo Prático (em TypeScript):

Imagine que você está criando um serviço para processar pagamentos.

*/

// Como NÃO fazer (Forte acoplamento):

