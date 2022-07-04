help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

functions := $(shell find lambda/functions -name \*main.go | awk -F '/' '{print $$3}')

build: lambda/functions
	@for function in $(functions) ; do \
		env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o gobin/$$function lambda/functions/$$function/main.go; \
	done

deploy: build
	sls deploy --aws-profile serverless  --verbose
