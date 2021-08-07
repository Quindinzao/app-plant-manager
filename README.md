Antes de testar, precisamos simular uma API, para tal, rode:
    json-server --port 8000 ./src/services/server.json --watch --delay 1000
    lt --port 8000 --subdomain application-mock-server