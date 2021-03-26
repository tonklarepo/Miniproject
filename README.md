# miniproject

Before doing this, you have to set up Docker Swarm on google cloud VM at least 3 nodes

#0. create flower_net network |
docker network create -d overlay --attachable flower_net 

#1. pull flower-api image |
docker pull tonklarepo/flowers-api

#2. pull uploadpage image |
docker pull tonklarepo/uploadpage

#3. create redis service |
docker service create --name redis-flowerapp --network flower_net redis 

#4. create flower-api service |
docker service create --name flowers-api --replicas 3 -p 8000:8000 --mount type=volume,source=db-flower,target=/data --network flower_net tonklarepo/flowers-api gunicorn --bind 0.0.0.0:8000 main:app

#5. create uploadpage image |
docker service create --name uploadpage -p 80:80 --network flower_net --replicas 3 tonklarepo/uploadpage
