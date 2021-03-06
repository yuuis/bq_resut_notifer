var scriptProp = PropertiesService.getScriptProperties();
var projectId = scriptProp.getProperty("project_id");

function main() {
  var result = query("{QUERY}");
  notify(result);
}

function query(queryString) {
  var url = "https://bigquery.googleapis.com/bigquery/v2/projects/" + projectId + "/queries";
  var service = getService();

  var response = sendRequest(url, {
    "method": "POST",
    "muteHttpExceptions": true,
    "contentType": "application/json",
    "payload": JSON.stringify({ "query": queryString }),
    "headers": { Authorization: "Bearer " + service.getAccessToken() } 
  });

  return response;
}

function sendRequest(url, fetchOptions) {
  return JSON.parse(UrlFetchApp.fetch(url, fetchOptions));
}

function notify(result) {
  var text = "";
  result.rows.forEach(function(row) {
    text += row.f[0].v + ": " + row.f[1].v
  });

  postToSlack(text);
}

function postToSlack(text) {
  var url = scriptProp.getProperty("slack_webhook_url");
  var username = "BQの結果を教えるくん";
  var icon = ":cat:";

  var payload = JSON.stringify({
    "username" : username,
    "icon_emoji": icon,
    "text" : text
  });

  var params = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(url, params);
}

function getService() {
  return OAuth2.createService("bigquery")
    .setTokenUrl("https://accounts.google.com/o/oauth2/token")
    .setPrivateKey(scriptProp.getProperty("private_key"))
    .setIssuer(scriptProp.getProperty("service_account_email"))
    .setPropertyStore(PropertiesService.getScriptProperties())
    .setScope("https://www.googleapis.com/auth/bigquery");
}
