#!/bin/bash

# Create directories
mkdir -p certs/server certs/client postgres-config

# Generate Root CA (PSPF Policy 8)
openssl req -new -x509 -days 3650 -nodes \
  -newkey rsa:4096 -sha256 \
  -out certs/server/root.crt \
  -keyout certs/server/root.key \
  -subj "/C=AU/ST=QLD/O=AGIS Investigations/CN=AGIS-Root-CA"

# Server Certificate (ISM-1753)
openssl req -new -nodes -newkey rsa:4096 -sha256 \
  -out certs/server/server.csr \
  -keyout certs/server/server.key \
  -subj "/C=AU/ST=QLD/O=AGIS Investigations/CN=db"

openssl x509 -req -in certs/server/server.csr -days 365 \
  -CA certs/server/root.crt -CAkey certs/server/root.key -CAcreateserial \
  -out certs/server/server.crt

# Client Certificate (AGIS 4.4)
openssl req -new -nodes -newkey rsa:4096 -sha256 \
  -out certs/client/client.csr \
  -keyout certs/client/client.key \
  -subj "/C=AU/ST=QLD/O=AGIS Investigations/CN=agis-app"

openssl x509 -req -in certs/client/client.csr -days 90 \
  -CA certs/server/root.crt -CAkey certs/server/root.key -CAcreateserial \
  -out certs/client/client.crt

# Set strict permissions (ISM-1405)
chmod 600 certs/server/*
chmod 600 certs/client/*
chmod 700 certs/server certs/client