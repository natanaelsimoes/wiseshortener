docker build -t natanaelsimoes/wiseweb .
docker-compose up --detach postgres
docker-compose up --detach web
docker-compose exec web yarn sequelize db:create
docker-compose exec web yarn sequelize db:migrate