function (user, context, callback) {
  const party = user.user_id.replace('|', '_');
  context.idToken["https://daml.com/ledger-api"] = {
    "ledgerId": "dbay",
    "participantId": null,
    "applicationId": "dbay",
    "admin": false,
    "actAs": [party],
    "readAs": [party]
  };
  callback(null, user, context);
}
