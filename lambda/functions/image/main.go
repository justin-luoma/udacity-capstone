package main

import (
	json2 "encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-xray-sdk-go/xray"
	"golang.org/x/net/context"
	"os"
	"strconv"
	"time"
)

const ImageS3Bucket = "IMAGE_S3_BUCKET"
const SignedUrlExpiration = "SIGNED_URL_EXPIRATION"

type CreateImageResponse struct {
	UploadURL string `json:"uploadUrl"`
	ImageURL  string `json:"imageUrl"`
}

func handler(event events.APIGatewayProxyRequest, awsSession *session.Session) (events.APIGatewayProxyResponse, error) {
	fmt.Printf("event: %+v\n", event)

	id, ok := event.PathParameters["id"]
	if !ok {
		return createResponse(400, "id is required")
	}

	_, root := xray.BeginSegment(context.Background(), "S3")
	defer root.Close(nil)

	s3Client := s3.New(awsSession)

	xray.AWS(s3Client.Client)

	expirationStr := os.Getenv(SignedUrlExpiration)
	exp, err := strconv.ParseInt(expirationStr, 10, 0)
	if err != nil {
		fmt.Println(err)
		return createResponse(500, "internal server error")
	}

	bucket := os.Getenv(ImageS3Bucket)

	request, _ := s3Client.PutObjectRequest(&s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(id),
	})

	url, err := request.Presign(time.Second * time.Duration(exp))
	if err != nil {
		fmt.Println(err)
		return createResponse(500, "internal server error")
	}

	if err != nil {
		fmt.Println(err)
		return createResponse(500, "internal server error")
	}

	json, err := json2.Marshal(CreateImageResponse{
		UploadURL: url,
		ImageURL:  fmt.Sprintf("https://%s.s3.amazonaws.com/%s", bucket, id),
	})
	if err != nil {
		fmt.Println(err)
		return createResponse(500, "internal server error")
	}

	return createResponse(201, string(json))
}

func createResponse(statusCode int, body string) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Body:       body,
		Headers: map[string]string{
			"Access-Control-Allow-Origin": "*",
		},
	}, nil
}

func main() {
	region := os.Getenv("AWS_REGION")
	AwsConfig := &aws.Config{
		Region: aws.String(region),
	}
	awsSession, err := session.NewSession(AwsConfig)

	if err != nil {
		fmt.Println(err)
		return
	}

	lambda.Start(func(event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		return handler(event, awsSession)
	})
}
