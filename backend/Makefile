yamls := $(wildcard *.yaml)

build: src/
	./gradlew build

deploy: build $(yamls)
	kubectl apply -f env-configmap.yaml
	kubectl apply -f env-secret.yaml
	kubectl apply -f deployment.yaml
	kubectl apply -f service.yaml
