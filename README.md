# BlockProject
## Get started
**About the project**
The project is divided into two seperate parts: front-end (React.js) and back-end (Node.js)  
For APIs documentations, the project is powered by Swagger  
To set up the environment for the project, simply install **Docker** and **Docker Compose** to bring up the server  

**How to set up Docker and Docker Compose**
Please visit this url to know more about how to install them: https://docs.docker.com/engine/install/  

## Bring up the servers
Using the terminal, navigate to the project's directory, use `docker-compose` to bring up the servers  
```
docker-compose up
```
After that,  
**Frontend server**: port 3000 on localhost (http://localhost:3000)  
**Backend server**: port 4000 on localhost (http://localhost:4000)  
**Swagger UI**: port 4000 on http://localhost:4000/api-docs/#/  

## Unit tests
Unit tests are written for backend server, it will be automatically trigger by the Dockerfile, you can see the log for the tests when bringing up the servers
