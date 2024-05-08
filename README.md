# API de Gerenciamento de Postagens

Este projeto consiste em uma API simples para gerenciar postagens, seguindo as diretrizes estabelecidas no desafio de back-end.

## Desenvolvimento

O projeto foi desenvolvido em Node.js com TypeScript utilizando o framework Express para criação das rotas da API. A persistência de dados foi implementada utilizando um banco de dados PostgreSQL, e a API foi containerizada usando Docker para facilitar o ambiente de desenvolvimento. Tanto a api quanto ao banco de dados foram configurados com uso de docker.

## Requisitos para Execução

Para executar o projeto localmente, é necessário ter o Docker instalado na máquina. O Docker Compose é utilizado para gerenciar os containers e a configuração do banco de dados.

## Instruções de Uso

1. Clone o repositório:

```bash
git clone https://github.com/Danilontn53/nodejs-backend-challenge.git
cd nodejs-backend-challenge
```

2. Crie um arquivo `.env` na raiz do projeto e copie os dados do arquivo `.env-example` para configurar as variáveis de ambiente necessárias, como a conexão com o banco de dados.

3. Execute o comando Docker Compose para iniciar o projeto:

```bash
docker-compose up
```

Isso iniciará a API e o banco de dados PostgreSQL.

4. Acesse a documentação da API Swagger em:

```
http://localhost:3000/docs
```

Aqui você encontrará informações detalhadas sobre as rotas disponíveis, parâmetros de requisição e exemplos de resposta.

## Próximos Passos

Visto do tempo de implementação, e que também estou trabalhando e estudando simultaneamente, não tive tempo hábil para incluir no projeto testes automatizados e autenticação JWT. Não utilizando de desculpas mas esses serão os próximos passos a serem implementados para melhorar a robustez com a biblioteca Jest para testes e o Passaport segurança da API. Caso me dêem a oportunidade basta atualizarem o repositório do projeto em alguns dias.

---

No mais agradeço pela oportunidade de estar participando desta seleção. Muito obrigado.

Att,

Danilo Santos
danilontn53@gmail.com
