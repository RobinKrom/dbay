#!/bin/bash

set -x

daml build -o .daml/dist/market-0.1.0.dar
daml ledger upload-dar --access-token-file certs/access_token .daml/dist/market-0.1.0.dar

# TODO (drsk): daml script can't run against an authenticated ledger
# daml script --dar .daml/dist/market-0.1.0.dar --script-name Market:init --ledger-host localhost --ledger-port 6865 -w --input-file ledger-parties.json

# triggers
daml trigger --access-token-file certs/access_token_drsk --dar .daml/dist/market-0.1.0.dar --trigger-name Market:issueRecurringInvoiceTrigger --ledger-host localhost --ledger-port 6865 --ledger-party drsk --wall-clock-time &
daml trigger --access-token-file certs/access_token_drsk --dar .daml/dist/market-0.1.0.dar --trigger-name Market:deleteInvoiceTrigger --ledger-host localhost --ledger-port 6865 --ledger-party drsk --wall-clock-time &
