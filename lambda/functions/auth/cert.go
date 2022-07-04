package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
)

func getCert(kId interface{}) (string, error) {
	apiDomain := os.Getenv(AUTH_API_DOMAIN)
	resp, err := http.Get(fmt.Sprintf("https://%s/.well-known/jwks.json", apiDomain))

	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	var jwks = Jwks{}
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		return "", err
	}

	cert := ""

	for k, _ := range jwks.Keys {
		if kId == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + jwks.Keys[k].X5c[0] + "\n-----END CERTIFICATE-----"
		}
	}

	if cert == "" {
		return cert, errors.New("kid not found in certs")
	}

	return cert, nil
}
