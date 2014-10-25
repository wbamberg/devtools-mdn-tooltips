const { Page } = require("sdk/page-worker");

const basePage = "https://developer.mozilla.org/en-US/docs/Web/CSS/";
const postfix = "?raw&macros";

function getTheDocs(propertyName, callback) {

  let mdnPage = Page({
    contentURL: basePage + propertyName + postfix,
    contentScriptFile: require("sdk/self").data.url("mdn-page.js"),
    contentScriptWhen: "ready"
  });

  mdnPage.port.on("got-the-docs", callback);
  mdnPage.port.on("error", function(error) {console.log("error loading : " + basePage + propertyName + postfix+ " : " + error)});

}

exports.getTheDocs = getTheDocs;