# Ceilândia Times

Portal de notícias com cara de jornal antigo para a cidade de Ceilândia (DF), feito em um hackathon. Tem uma página de notícias, um mural de posts da comunidade com comentários, cadastro e login de usuários e uma página de perfil com foto.

Feito com Node.js, Express, EJS e PostgreSQL. As fotos de perfil vão para o Cloudinary.

![Página de notícias do Ceilândia Times, com cabeçalho no estilo de jornal antigo e uma foto do centro de Ceilândia](docs/screenshot.png)

**Status:** protótipo de hackathon (dezembro de 2024). O front-end está mais adiantado que o back-end: as notícias e os posts da comunidade são conteúdo fixo nas páginas EJS (texto de exemplo), e só o cadastro, o login e a foto de perfil usam o banco. Veja as [limitações conhecidas](#limitações-conhecidas).

## Funcionalidades

- **Notícias** (`/noticias`) e **página inicial** (`/index`) com visual de jornal impresso.
- **Posts da comunidade** na página inicial, com comentários e menus para ordenar e filtrar por tipo de post (por enquanto só o layout).
- **Cadastro e login** na mesma tela (`/Login`), com senha guardada com hash `bcrypt`, botão para mostrar/ocultar senha e janela de "Esqueceu a senha?" com os contatos da escola.
- **Perfil** (`/perfil`, só para usuário logado) com envio de foto para o Cloudinary.
- Menu lateral que abre pelo ícone de hambúrguer.

## Como rodar localmente

Pré-requisitos: Node.js (testado com a versão 24), um banco PostgreSQL e uma conta no Cloudinary (só para o envio de fotos).

```bash
git clone https://github.com/oliveirahipx/ceilandia-times.git
cd ceilandia-times
npm install
cp .env.example .env   # depois preencha os valores
npm start
```

O servidor sobe em <http://localhost:3000> (porta fixa em `app.js`); a raiz redireciona para `/index`. Para reiniciar sozinho ao salvar arquivos, use `npm run dev` (nodemon).

As páginas `/index`, `/noticias` e `/Login` abrem mesmo sem banco configurado. Cadastro, login e perfil precisam do banco.

### Variáveis de ambiente

Estão todas em [`.env.example`](.env.example):

| Variável | Para que serve |
| --- | --- |
| `DATABASE_URL` | string de conexão do PostgreSQL |
| `DATABASE_SSL` | `true` (padrão) conecta com SSL, como no Render; use `false` para um Postgres local sem SSL |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | credenciais do Cloudinary para as fotos de perfil |
| `SESSION_SECRET` | segredo da sessão; troque por um valor aleatório |

### Banco de dados

O repositório não traz o script de criação. O código usa uma única tabela:

| Tabela | Colunas usadas |
| --- | --- |
| `usuarios` | `id`, `nome`, `email`, `senha`, `imagemPerfil` |

## Rotas

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/` | redireciona para `/index` |
| GET | `/index` | página inicial com notícias e posts da comunidade |
| GET | `/noticias` | página de notícias |
| GET | `/Login` | tela de cadastro e login |
| POST | `/Login` | autentica e cria a sessão |
| POST | `/Cadastro` | cria o usuário |
| GET | `/Logout` | encerra a sessão |
| GET | `/perfil` | perfil do usuário logado |
| POST | `/upload` | envia a foto de perfil |

## Estrutura

```
app.js                  ponto de entrada: carrega o .env, registra as rotas e sobe o servidor
config/server.js        Express, EJS, arquivos estáticos e sessão
config/db.js            pool de conexões do PostgreSQL
config/multerConfig.js  upload em memória e configuração do Cloudinary
app/routes/             index, login (cadastro e login), noticias e perfil
app/views/              páginas EJS
public/                 CSS e JavaScript do navegador
```

## Limitações conhecidas

- Algumas imagens e a fonte do título (`/media/...` e `/font/...`) nunca foram enviadas ao repositório, então os ícones dos posts da comunidade e a fonte de jornal não carregam. As imagens hospedadas no Cloudinary aparecem normalmente.
- Notícias e posts são texto de exemplo fixo no HTML; não há cadastro de notícias nem de posts. Os botões de abrir e fechar comentários chamam `openCommentWindow`/`closeCommentWindow`, que não foram implementadas, e os menus de ordenar e filtrar não fazem nada ainda.
- Depois do cadastro, a sessão guarda só o nome do usuário, então ele precisa fazer login antes de abrir o perfil.
- O campo "Turma" do cadastro não é salvo, e o formulário de edição de dados do perfil aponta para `/profile/update`, que não existe.

## Tecnologias

Node.js, Express 4, EJS, PostgreSQL (`pg`), express-session, bcrypt, Multer e Cloudinary. Front-end em HTML, CSS e JavaScript.
