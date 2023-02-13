# Projects Management API


## Descrição

Essa api foi criada como parte do processo seletivo da empresa **Fontes Pagadoras**.

O objetivo era entregar uma API de gerenciamento de projetos, onde um usuário pode se cadastrar e em seguida, cadastrar seus projetos e fazer posteriores alterações.

Um dos requisitos, era o uso de um banco de dados PostgreSQL, que optei por configurar dentro de um container do Docker.

:exclamation: Caso não tenha o Docker instalado, faça primeiro a [instalação](https://docs.docker.com/engine/install/) para seguir com os próximos passos.

Utilizei o [Prisma](https://www.prisma.io/), um ORM que além de abstrair toda a criação das tabelas e manipulação do banco de dados, ainda facilita a visualização do banco de dados.

Para a criação da API, utilizei o [NestJS](https://nestjs.com/), e ainda adicionei o [Swagger](https://swagger.io/), que facilita a visualização da estrutura da api, além de possibilitar testá-la e utilizá-la sem mais nenhuma ferramenta.
<br>
<br>
<!-- <hr> -->

## Rodando o Projeto

<hr>

## Antes de mais nada

**Na raiz do projeto**:

Crie um arquivo `.env`, e inclua a connection string do banco:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
```

Instale as dependências

```bash
$ npm install
```

Suba o container contendo o banco de dados:

```bash
$ docker-compose up
```

Rode as migrations, com o comando:
```bash
$ npx prisma migrate dev
```
## Rodando a aplicação

No terminal, rode o comando:
```bash
$ npm run start
```

A API estará rodando na porta 3000 ([http://localhost:3000](http://localhost:3000))

O swagger estará rodando em [http://localhost:3000/api](http://localhost:3000/api), e te possibilitará visualizar a estrutura e testar a API, como na imagem abaixo:

![Swagger page](/readme-images/swagger.png "Swagger screen")

Para visualizar as alterações no banco de dados, inicie o Prisma Studio em um novo terminal, atavés do comando:
```bash
$ npx prisma studio
```
Exemplo de visualização:

![Prisma Studio](/readme-images/prisma-studio.png "Prisma Studio screen")

:exclamation: Lembre-se de a cada alteração no banco, atualizar a página do Prisma Studio.

<hr>
<br>

# Rotas da Aplicação

## POST /users

A rota recebe name e username dentro do body. Ao cadastrar um novo usuário, ele é armazenado no seguinte formato:

```js
{
    id: 'uuid',
    name: 'João Silva',
    password: '***',
    username: 'joão.silva',
}

```

:exclamation: Não é permitido o cadastro de usernames em duplicidade.

<br>

## POST /projects

A rota recebe title, zip_code, deadline e cost dentro do body e a propriedade username contendo o username do usuário dentro do header da requisição.

Ao criar o novo project, ele é armazenado no seguinte formato:

```js
{
    id: 'uuid',
    title: 'Nome do projeto',
    zip_code: 88010400,
    cost: 9500,
    done: false,
    deadline: '2022-02-13T00:00:00.000Z',
    username: 'joão.silva',
    created_at: '2022-02-13T00:00:00.000Z',
    updated_at: '2022-02-13T00:00:00.000Z'
}

```

<br>

## GET /projects

A rota recebe, pelo header da requisição, uma propriedade username contendo o username do usuário e retornar uma lista com todos os projetos desse usuário.

<br>

## GET  /project

A rota deve recebe o id do projeto e retornar as informaçãoes do mesmo, e ao invés de mostrar o número do CEP (zip_code) exibe a localização (location) onde o projeto será executado, no formato <cidade> - <estado>.

Ex.: location: "Rio de Janeiro - RJ"


O processo de substituição do campo zip_code pelo campo location, se deu através dos dados consumidos da api da [Via CEP](https://viacep.com.br).
Para fazer a requisição, utilizei o [Axios](https://axios-http.com/docs/intro).

<br>

## PUT /projects:id

A rota receber, pelo header da requisição, uma propriedade username contendo o username do usuário e recebe as propriedades title, zip_code, cost e deadline, dentro do body. Só é possível editar um projeto caso seja correspondente ao usuário informado.

<br>

## PATCH /projects/:id/done

A rota recebe, pelo header da requisição, uma propriedade username contendo o username do usuário e altera a propriedade done para true no project, marcando assim o projeto como concluído.

<br>

## DELETE /projects/:id

A rota recebe pelo header da requisição uma propriedade username contendo o username do usuário e exclui o projeto. O projeto só é excluído caso pertença ao usuário informado.