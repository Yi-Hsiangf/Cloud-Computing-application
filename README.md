# Cloud-Computing-application
## 1. Online Library App implemented by node.js
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

## 2. Application Deployment Using Docker (Library app)
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

## 3. Product Query Service implemented by Seneca.js
#### Microservice Architecture of the application
<a href="url"><img src="https://user-images.githubusercontent.com/47914159/129452742-5cabeb68-f697-4465-8540-72583f4870e3.png" height="300" width="300"></a>



## 4. Application Deployment using Kubernetes (Product Service APP)
#### Install docker and Kubernetes
```bash
# 1. Install packages to allow apt to use a repository over HTTPS
sudo apt-get install \
apt-transport-https \
ca-certificates \
curl \
software-properties-common
# 2. Add Docker’s official GPG (GNU Privacy Guard) key:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key
add -
# 3. Use the following command to set up the stable repository.
sudo add-apt-repository \
"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) \
stable"
14
# 4. Switch to root user
sudo su root
# 5. Add Kubernetes repositories
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key
add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
# 6. Switch to the normal user
su <orginal user name>
# 7. Update the apt package index.
sudo apt-get update
# 8. Install the latest version of Docker by using this command.
sudo apt-get install -y docker-ce
# 9. Installation kubeadm, kubernetes and kubectl
sudo apt-get install -y kubelet kubeadm kubernetes-cni
```

#### Using kubeadm to deploy kubernetes Cluster
Install Docker, Kubernetes, Kubeadm and Kubectl on Master and Slave nodes
Initialize the Master Node using kubeadm init command (need to be run as root)
```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

Before going forward, you should create a new user and add it to sudoers and
run the following commands on it:
```bash
sudo mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Check everything is running fine by running command
```bash
kubectl get nodes
```

#### Installing the Pod Network
```bash
kubectl apply -f
https://raw.githubusercontent.com/coreos/flannel/2140ac876ef134e0ed5af15c65e41
4cf26827915/Documentation/kube-flannel.yml
```

#### Status Check
Check the status of pods run the following command
```bash
kubectl get pods --all-namespaces
```

Check the status of node using the command
```bash
kubectl get nodes
```
#### Deployment
deployment for the microservices using the command
```bash
kubectl apply -f kubernetes_files/deployments/< file_name>.yml
```
Check the status of all the pods in the deployments by running the command
```bash
kubectl get pods --all-namespaces
```

Check the status of deployments
```bash
kubectl get deployments --all-namespaces
```
#### Running containerized images
```bash
kubectl apply -f kubernetes_files/services/<file_name>.yml
```
#### Scaling the deployment
```bash
kubectl scale deployment <deployment_name> --replicas=<replicaNumber>
```

#### Deleting the Restting the Cluster
```bash
# To delete the service and deployment you can run the following command:
kubectl delete service,deployment <deployment_Name>
# Reset all kubeadm installed state, run the following command on master
kubeadm reset
# Delete the configuration file
sudo rm -r $HOME/.kube/config
```
