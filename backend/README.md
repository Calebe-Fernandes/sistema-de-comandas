REQUERIMENTOS
  Docker CLI (https://docs.docker.com/get-docker/)


Build the jar file:

Windows -> navegue até o 'backend' e execute 'build.bat'

Linux   -> navegue até o 'backend' e execute './build.sh'



Executar o backend

Na pasta 'backend' execute 'docker compose up -d' (flag -d é para executar no backgound, se quiser acompanhar a execução, não use -d)


Comandos Docker básico

docker ps -> mostra os container ativos (enquando o backend estiver rodando, dois container dever aparecer aqui, 'postgres' e 'backend')
docker stop <nome> -> para o conainter com o nome <name> (coluna NAMES de docker ps)
  
Rota do backend
  PORTA 8080 (http://localhost:8080/swagger-ui.html)
