This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

http://test.phuongjolly.com

### Solution
Using react/redux for implementation. IDE: WebStorm.

Completed features:
 - List of customers
 - Order detail and product detail of each customer

### Configuration

in `setupProxy.js`, change target to:
http://localhost:8081/

### Run locally

This project uses `create-react-app`.
You can use IDE like WebStorm to open the project or follow these steps to run the application.

Install dependencies:

```
yarn install
```

Start website locally:

```
yarn start
```
### Deploy using docker

Build docker image:

```
docker build . -t phuongjolly/sonar-website

```

Push docker image to repository:

```
docker push phuongjolly/sonar-website
```

Deploy the website on the server:

```
docker run phuongjolly/sonar-website
```

## Deploy using Rancher 

Download from: https://rancher.com/docs/rancher/v2.x/en/installation/

