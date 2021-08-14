FROM node:alpine
MAINTAINER Vivid

# Create Application Directory
RUN mkdir -p /usr/src/server 

# Set the working directory of the container for all the RUN commands
WORKDIR /usr/src/server      

# Copy the package.json file which contain all the dependencies required for application
COPY package.json /usr/src/server/ 

# This command will install all the dependencies listed in package.json
RUN npm install 		   
 
# Copy all other files from local machine to container
COPY . /usr/src/server		   
# Expose container port to the host machine
EXPOSE 3000		            
# A start command to run the application
CMD [ "node", "server.js"]         
