const { Page } = require("sdk/page-worker");

let docHub = Page({
  contentURL: "http://dochub.io/#css/",
  contentScriptFile: require("sdk/self").data.url("dochub.js"),
  contentScriptWhen: "ready"
});

function getExample(propertyName, callback) {
  docHub.port.emit("get-example", propertyName);
  docHub.port.on("example", callback);
}

exports.getExample = getExample;