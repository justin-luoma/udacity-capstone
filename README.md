# Udacity Capstone

## Website URL

[https://d46adv7k03c3k.cloudfront.net/](https://d46adv7k03c3k.cloudfront.net/)

App will allow you to create text posts with an image, you can edit a post and update the image (sometime your 
browser caches the previous image, you will need to refresh the page to get the newest image) 

## Postman

[collection](capstone.postman_collection.json)

You will need a token, the UI will output the token to the developer console after login

## Structure

#### Lambdas
[auth](lambda/functions/auth):

Custom Authorizer

[image](lambda/functions/image):

Creates S3 signed url for image storage

#### Backend

[posts service](backend)

Spring Boot API used to interact with database to store posts

#### Client

[posts client](client)

React frontend

## Build and Deploy

### Lambdas and S3 resources

Uses [serverless](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/)

[serverless.yaml](serverless.yml)

`make deploy`

### Backend

*needs and EKS cluster and Postgresql RDS*

CI: [GitHub Actions](https://github.com/features/actions) 

Image Publishing: [Jib](https://github.com/GoogleContainerTools/jib)

[CI config](.github/workflows/gradle-publish.yml)

Once CI pipeline completes
```
cd backend
make deploy
```

### Client

Uses [serverless components](https://github.com/serverless/components)

[serverless.yaml](client/serverless.yml)

```
cd client
make deploy
```

