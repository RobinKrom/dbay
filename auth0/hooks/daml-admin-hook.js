module.exports = function(client, scope, audience, context, cb) {
  var accesss_token = {};
  if (client.id === "2Kv0JP0uYq2T0MO3R91VWpqFqfrv37PH") {
    access_token["https://daml.com/ledger-api"] = {
      "ledgerId": "dbay",
      "participantId": null,
      "applicationId": "dbay",
      "admin": true,
      "actAs": [],
      "readAs": []
    };
  }
  cb(null, access_token);
};
