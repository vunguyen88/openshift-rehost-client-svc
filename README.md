# todo-eks-client-srv (Client Web Server deploy on EKS)

This repository contains a simple React application utilized Vite configured to run inside a Docker container on port 3000.

The repository is a replacement for previous todo-client app using React for production ready purpose.

The deployment service using both ClusterIP for internal traffic and NodePort for dev purpose.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

### 1. Clone the repository

Clone this repository to your local machine using the following command:

### 2. Build the app using Dockerfile
```sh
docker build -t todo-openshift-client .
```

### 3. Push image to Docker Hub
```sh
docker push vunguyen88/todo-openshift-client:latest
```

## Helm

# Create namespace dev(prod) for dev(prod) env
```
kubectl create namespace dev
```

```
kubectl create namespace prod
```

# Install chart

In the root folder, run following cmd to install the chart with value using dev-env in dev namespace
```
helm install vite-app-release-dev helm/vite-app-chart/ --values helm/vite-app-chart/values.yaml -f helm/vite-app-chart/values-dev.yaml -n dev
```
or prod values env in prod name space
```
helm install vite-app-release-dev helm/vite-app-chart --values helm/vite-app-chart/values.yaml -f helm/vite-app-chart/values-prod.yaml -n prod
```
# Upgrade chart
For dev env
```
helm upgrade vite-app-release-dev helm/vite-app-chart --values helm/vite-app-chart/values.yaml -f helm/vite-app-chart/values-dev.yaml -n dev
```

For prod env
```
helm upgrade vite-app-release-prod helm/vite-app-chart --values helm/vite-app-chart/values.yaml -f helm/vite-app-chart/values-prod.yaml -n prod
```

# List all charts for associate with namespace
```
helm ls --all-namespaces
```

# To switch between namespace
```
kubectl config set-context --current --namespace=dev
```

# Accessing the application
```
minikube tunnel
```
If the minikube tunnel already exist, find the PID of the 