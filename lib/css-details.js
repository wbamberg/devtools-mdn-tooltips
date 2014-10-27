const { Page } = require("sdk/page-worker");

const postfix = "?raw&macros";

function getTheDocs(url, callback) {

  let pageUrl = url + postfix;

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
    console.log("error loading : " + pageUrl);
  }

  mdnPage.port.on("got-the-docs", gotTheDocs);
  mdnPage.port.on("got-error", gotError);

}

exports.getTheDocs = getTheDocs;
