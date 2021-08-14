# Cloud-Computing-application
## Online Library App implemented by node.js
#### Installation (Nodejs)
```bash
wget -qO- https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```
#### Start MongoDB
```bash
mongod --dbpath=./data
```
#### Start Node.js APP
```bash
npm install
sudo node server.js
```

## Application Deployment Using Docker
#### Install Docker
Docker Installation (use this official steps only): https://docs.docker.com/install/linux/docker-ce/ubuntu/  
Docker Compose Installation: https://docs.docker.com/compose/install/#prerequisites  
#### Running and testing the Application
```bash
# 1. Do the changes to the application on your local laptop/computer.
# 2. Check the application is running or not locally.
sudo docker-compose up –build
# If everything is working correctly now :
# 1. Create a repository on docker hub.
# 2. Login to your hub account using the command on your local machine :
sudo docker login
# ３. Push Images to docker hub (don’t forget to add your docker hub id and image name into docker-compose.yml file)
sudo docker-compose push
# ４. Copy the docker-compose.yml file to the VM and remove build line from it.
# ５. Run the application using docker-compose
sudo docker-compose up
```
