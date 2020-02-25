#!/bin/sh
daml sandbox -w --auth-jwt-rs256-crt ./certs/sandbox.crt --ledgerid dbay &
sleep 5
daml json-api --access-token-file ./certs/access_token --ledger-host localhost --ledger-port 6865 --http-port 7575 --application-id dbay
