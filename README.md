# Wise Shortener - Natanael Simões

Este é um encurtador que fiz durante aplicação de uma vaga na Wise.

A API está rodando atualmente em um servidor público do Heroku pelo link https://wiseshortener-natanaelsimoes.herokuapp.com. 

Você pode utilizar o editor online do swagger
para ver a documentação da API em https://editor.swagger.io. Clique em `File > Import URL`
e insira o link da documentação `https://raw.githubusercontent.com/natanaelsimoes/wiseshortener/master/openapi.yaml`.

## Características

- O encurtador seleciona aleatoriamente a quantidade de caracteres para gerar o hash, mínimo 5 e máximo 10
- O encurtador cria hashes com os caracteres `a-zA-Z0-9` (62 caracteres), portanto o limite de hashes ativos é de 62^10 = 8,39e17
- Cada hash tem um tempo de expiração de 30 dias contados a partir do momento de sua criação
- Caso um hash expirado seja gerado novamente, o registro da url anterior será excluído para dar lugar a uma nova url, tornando possível a reciclagem de hashes expirados
- A implementação utiliza TS, Express e PostgreSQL

## Docker

Para rodar localmente utilizando docker, execute os comandos a seguir em sequência.
O objetivo é gerar o build da imagem, subir um banco de dados PostgreSQL e executar 
os scripts para a criação do banco de dados:

```bash
docker build -t natanaelsimoes/wiseweb .
docker-compose up --detach postgres
docker-compose up --detach web
docker-compose exec web yarn sequelize db:create
docker-compose exec web yarn sequelize db:migrate
```

Depois de executar os comandos, o serviço será exposto em http://localhost:8081/.

## Dev

Você pode aproveitar o container docker do banco de dados para desenvolver (porta 5432 exposta),
ou usar uma outra instância de sua preferência.

Configure o acesso ao banco de dados em `src/DatabaseConfig.json` e realize o processo de criação e migração de dados como fizemos no Docker.

O serviço rodará sem build pelo comando `yarn dev`.

## Testes

Uma vez que você tenha configurado o acesso ao banco de dados, você pode 
rodar os testes pelo comando `yarn test`.
