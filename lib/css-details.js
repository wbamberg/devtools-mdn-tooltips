const { Page } = require("sdk/page-worker");

const basePage = "https://developer.mozilla.org/en-US/docs/Web/CSS/";
const postfix = "?raw&macros";

function getTheDocs(propertyName, callback) {

  let pageUrl = basePage + propertyName + postfix;

  let mdnPage = Page({
    contentURL: pageUrl,
    contentScriptFile: require("sdk/self").data.url("mdn-page.js"),
    contentScriptWhen: "ready"
  });

  function gotTheDocs(theDocs) {
    mdnPage.destroy();
   callback(theDocs);
  }

  function gotError() {
    mdnPage.destroy();
    console.log("error loading : " + pageUrl + " : " + error);
  }

  mdnPage.port.on("got-the-docs", gotTheDocs);
  mdnPage.port.on("error", gotError);

}

exports.getTheDocs = getTheDocs;