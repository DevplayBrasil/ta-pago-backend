# TaPago Server

Aplicação backend em desenvolvimento ao vivo no Devplay!

## Features

- ✅ Login Social (Google e Microsoft)
- ✅ Banco de dados não relacional integrado e funcional (MongoDB)

## Como usar
- Você vai precisar de uma instância de banco de dados não relacional. Sugiro o MongoDB
    - Acesse o site do MongoDB.
    - Crie uma conta, clicando em "Sign Up" ou "Try Free".
    - Na página de "Get started for free", selecione a opção "Shared Clusters".
    - Clique em "Create a Cluster".
    - Escolha um provedor de nuvem, como AWS, Google Cloud ou Azure.
    - Selecione a região onde deseja criar sua instância.
    - Escolha a opção "M0 Sandbox".
    - Escolha um nome para o seu cluster.
    - Clique em "Create Cluster" para criar sua instância gratuita.

- Você vai precisar criar uma aplicação na sua [Google Cloud Platform](https://console.cloud.google.com/apis/credentials)
    - Acesse o console do GCP.
    - Se você não tiver uma conta do Google Cloud, crie uma clicando em "Criar conta".
    - Crie um novo projeto, clicando em "Selecionar Projeto" no canto superior esquerdo da tela, e em seguida em "Novo Projeto".
    - Forneça um nome para o projeto e clique em "Criar".
    - Selecione o projeto recém-criado clicando em "Selecionar Projeto" novamente.
    - Abra o menu de navegação e selecione "APIs e Serviços" > "Credenciais".
    - Clique em "Criar Credenciais" e selecione "ID do Cliente OAuth".
    - Selecione "Aplicativo Web" como tipo de aplicativo.
    - Insira um nome para a credencial e adicione o URI de redirecionamento, que é o URL onde o Google redirecionará o usuário após o login. Este deve ser um URL válido para o seu aplicativo.
    - Clique em "Criar" para criar a credencial.
    Na página de detalhes da credencial, você encontrará o ID do cliente e o segredo do cliente (client secret). O ID do cliente é necessário para configurar a autenticação no seu aplicativo.
    <br><br>

- Você vai precisar criar uma aplicação na sua [Azure Active Directory](https://portal.azure.com/)
    - Faça login no [portal do Azure](https://portal.azure.com/).
    - No menu à esquerda, clique em "Azure Active Directory".
    - Na página do Azure Active Directory, clique em "App registrations" (registros de aplicativos).
    - Clique no botão "New registration" (novo registro) no topo da página.
    - Na página "Register an application", forneça um nome para o aplicativo. Esse nome será exibido aos usuários ao se autenticarem em sua aplicação. Você também deve selecionar o tipo de conta que os usuários usarão para fazer login. Por exemplo, se você estiver criando um aplicativo para contas Microsoft, selecione "Accounts in any organizational directory (Any Azure AD directory - Multitenant)".
    - Na seção "Redirect URI", especifique o URI de redirecionamento para sua aplicação. Isso é usado para redirecionar os usuários de volta para sua aplicação após a autenticação. Por exemplo, se você estiver desenvolvendo uma aplicação da web, o URI de redirecionamento pode ser "https://sua-app.com/auth/callback".
    - Clique no botão "Register" (registrar) na parte inferior da página. O Azure criará o registro de aplicativo e exibirá uma página com as informações do aplicativo.
    Na página de informações do aplicativo, você pode encontrar a ID do cliente do aplicativo, que é um valor exclusivo que identifica seu aplicativo no Azure Active Directory. Você também pode criar e gerenciar as chaves de autenticação, configurar as permissões de aplicativo e muito mais.
<br>
  
## TODOs  
  - Implementar testes unitários.
  
## Como colocar pra funcionar!
    - Configure seu arquivo `.env` para que comporte as chaves necessárias como exemplificado no arquivo `.env.example`
    - Por via das dúvidas, execute os comandos relativos ao Prisma para o banco de dados não relacional funcionar como esperado
        - npx prisma generate
    - É isso! Agora é só executar o comando `npm run dev` 🔥
    
<br><br><br>
##### Made with 💜 by [Jhonatan](https://github.com/jhonatanjunio)Recompensas:

