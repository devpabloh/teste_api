class GerenciadorDeUsuario {
    
    cadastrarUsuario(dados: any){

        // 1. Valida as informações do usuário
        if(!dados.email.includes('@')){
            throw new Error("E-mail inválido")
        }

        // 2. Salva no banco de dados (simulando)
        console.log("Salvando usuário no banco de dados...", dados)

        // 3. Enviar e-mail de boas-vindas
        console.log("Enviando e-mail para: ", dados.email)
    }

    
}

// Resposta do exercício

class Usuario{
    constructor(
        public name: string, 
        public email: string
    ){}
}

class ValidadorUsuario{
    validar(usuario: Usuario){
        if(!usuario.email.includes('@')){
            throw new Error("E-mail inválido")
        }
    }
}

class UsuarioRepository{
    salvar(usuario: Usuario){
        console.log("Salvando usuário no banco de dados ", usuario)
    }
}

class EmailService {
    enviarBoasVindas(usuario: Usuario){
        console.log("Enviando e-mail de boas vindas para ", usuario.email)
    }
}

class GerenciadorDeUsuario2{
    constructor(
        private validadorUsuario: ValidadorUsuario,
        private usuarioRepository: UsuarioRepository,
        private emailService: EmailService
    ){}

    cadastrar(usuario: Usuario){
        this.validadorUsuario.validar(usuario),
        this.usuarioRepository.salvar(usuario),
        this.emailService.enviarBoasVindas(usuario)
    }
}