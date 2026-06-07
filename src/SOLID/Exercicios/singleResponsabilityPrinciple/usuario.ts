/* 
REFATORE A CLASSE USUARIO
class Usuario {
    constructor(public nome: string, public email: string) {}
  
    validar(): boolean {
      return this.email.includes("@") && this.nome.length > 0;
    }
  
    salvarNoBanco(): void {
      console.log(`Salvando ${this.nome} no banco...`);
    }
  
    enviarEmailBoasVindas(): void {
      console.log(`Enviando email para ${this.email}...`);
    }
} */

class Usuario{
    nome: string
    email: string

    constructor(
        nome: string, email: string
    ){
        this.nome = nome
        this.email = email
    }
}

class ValidarUsuario{

    validar(usuario: Usuario){
        if(!usuario.email.includes('@')){
            throw new Error("E-mail inválido")
        }

        if(usuario.nome.length === 0){
            throw new Error("usuário inválido")
        }
    }
}


class RepositoryBancoDeDados{
    salvarNoBanco(usuario: Usuario){
        console.log(`Salvando ${usuario.nome} no banco de dados`)
    }
}

class EnviarEmail{
    enviarBoasVindas(usuario: Usuario){
        console.log(`Enviando email de boas vindas para ${usuario.email}`)
    }
}

class CadastroDoUsuario{
    validarUsuario: ValidarUsuario
    repositoryBancoDeDados: RepositoryBancoDeDados
    enviarEmail: EnviarEmail


    constructor(
        validarUsuario: ValidarUsuario,
        repositoryBancoDeDados: RepositoryBancoDeDados,
        enviarEmail: EnviarEmail
    ){
        this.validarUsuario = validarUsuario
        this.repositoryBancoDeDados = repositoryBancoDeDados
        this.enviarEmail = enviarEmail

    }

    cadastrar(usuario: Usuario){
        this.validarUsuario.validar(usuario)
        this.repositoryBancoDeDados.salvarNoBanco(usuario)
        this.enviarEmail.enviarBoasVindas(usuario)
    }
}

const validarUsuario = new ValidarUsuario()
const repositoryBancoDeDados = new RepositoryBancoDeDados()
const enviarEmail = new EnviarEmail()


const cadastrarUsuario = new CadastroDoUsuario(validarUsuario, repositoryBancoDeDados, enviarEmail)

const usuario = new Usuario(
    "Pablo Henrique",
    "devpabloh@gmail.com"
)

try {
    cadastrarUsuario.cadastrar(usuario)
    console.log("Usuário cadastrado com sucesso")
} catch (error) {
    console.log((error as Error).message)
}