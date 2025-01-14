# todo-eks-client-srv (Client Web Server deploy on EKS)

This repository contains a simple React application utilized Vite configured to run inside a Docker container on port 3000.

The repository is a replacement for previous todo-client app using React for production ready purpose and rehost from EKS to onprem Openshift.

The deployment service using LoadBalancer for dev purpose.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

### 1. Clone the repository

Clone this repository to your local machine using the following command:

### 2. Build the app using Dockerfile
```sh
docker build --build-arg NODE_ENV=development -t vunguyen88/todo-openshift-client:latest .

```
```sh
docker build --build-arg NODE_ENV=production -t vunguyen88/todo-openshift-client:latest .

```

### 3. Push image to Docker Hub
```sh
docker push vunguyen88/todo-openshift-client:latest
```

## Helm

# Create namespace dev(prod) for dev(prod) env
```sh
kubectl create namespace dev
```

```sh
kubectl create namespace prod
```

# Install and upgrade chart

In the root folder, run following cmd to install the chart with value using dev-env in dev namespace
```sh
helm upgrade --install client-vite-dev ./helm/vite-app-chart -f ./helm/vite-app-chart/values.yaml -f ./helm/vite-app-chart/values-dev.yaml -n dev
```
or prod values env in prod name space
```sh
helm upgrade --install client-vite-prod ./helm/vite-app-chart -f ./helm/vite-app-chart/values.yaml -f ./helm/vite-app-chart/values-prod.yaml -n prod
```

# List all charts for associate with namespace
```sh
helm ls --all-namespaces
```

# To switch between namespace
```sh
kubectl config set-context --current --namespace=dev
```
```sh
kubectl config set-context --current --namespace=prod
```

# Accessing the application
```sh
minikube tunnel
```
```sh
kubectl port-forward service/client-vite-dev-svc 8443:3000 -n dev
```
```sh
kubectl port-forward service/client-vite-prod-svc 8443:3000 -n prod
```