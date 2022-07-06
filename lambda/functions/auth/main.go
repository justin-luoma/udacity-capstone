package main

import (
	"errors"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/golang-jwt/jwt/v4"
	"os"
	"strings"
	"time"
)

const AUTH_API_ID = "AUTH_API_ID"
const AUTH_API_DOMAIN = "AUTH_API_DOMAIN"

func authorize(event events.APIGatewayV2CustomAuthorizerV1Request) (events.
	APIGatewayV2CustomAuthorizerIAMPolicyResponse, error) {
	authHeader := event.AuthorizationToken
	apiId := os.Getenv(AUTH_API_ID)
	apiDomain := os.Getenv(AUTH_API_DOMAIN)

	fmt.Printf("id: %s\ndomain: %s\n", apiId, apiDomain)

	fmt.Println("running authorize")

	fmt.Printf("event: %+v\n", event)

	if strings.HasPrefix(authHeader, "Bearer ") {
		token := strings.Split(authHeader, " ")[1]
		fmt.Println(token)

		parsedJwt, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			fmt.Printf("parsing token: %+v\n", token)

			now := time.Now()

			checkExpired := token.Claims.(jwt.MapClaims).VerifyExpiresAt(now.Unix(), true)
			if !checkExpired {
				return token, errors.New("expired token")
			}

			checkAudience := token.Claims.(jwt.MapClaims).VerifyAudience(apiId, true)
			if !checkAudience {
				return token, errors.New("invalid audience")
			}

			checkIssuer := token.Claims.(jwt.MapClaims).VerifyIssuer(fmt.Sprintf("https://%s/", apiDomain), true)
			if !checkIssuer {
				return token, errors.New("invalid issuer")
			}

			if token.Method.Alg() != jwt.SigningMethodRS256.Name {
				return token, errors.New("invalid signing method")
			}

			cert, err := getCert(token.Header["kid"])

			if err != nil {
				return token, errors.New("invalid signature")
			}

			key, err := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))

			if err != nil {
				return token, errors.New("invalid certificate")
			}

			return key, nil
		})

		if err != nil {
			fmt.Printf("parse error: %s\n", err.Error())
		} else {

			fmt.Printf("parsedJwt: %+v\n", parsedJwt)

			if parsedJwt.Valid {
				sub, ok := parsedJwt.Claims.(jwt.MapClaims)["sub"].(string)
				if ok {
					return generatePolicy(sub, "Allow"), nil
				}
			}
		}
	}

	return generatePolicy("user", "Deny"), nil
}

func generatePolicy(id string, action string) events.APIGatewayV2CustomAuthorizerIAMPolicyResponse {
	return events.APIGatewayV2CustomAuthorizerIAMPolicyResponse{
		PrincipalID: id,
		PolicyDocument: events.APIGatewayCustomAuthorizerPolicy{
			Version: "2012-10-17",
			Statement: []events.IAMPolicyStatement{
				{
					Action:   []string{"execute-api:Invoke"},
					Effect:   action,
					Resource: []string{"*"},
				},
			},
		},
	}
}

func main() {
	lambda.Start(authorize)
}
