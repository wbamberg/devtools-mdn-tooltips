const tabUtils = require("sdk/tabs/utils");
const windowUtils = require("sdk/window/utils");
const { ActionButton } = require("sdk/ui/button/action");
const tabs = require("sdk/tabs");
const self = require("sdk/self");
const css = require("./css-details");
const {Cc, Ci, Cu} = require("chrome");
Cu.import("resource:///modules/devtools/gDevTools.jsm");
Cu.import("resource://gre/modules/devtools/Loader.jsm");

const cssPropertyNameClass = "ruleview-propertyname";
let currentCssProperty = "";
let currentNode = undefined;
let currentOverviewText = "";
let currentExampleText = "";
let currentNodeName = "";

gDevTools.on("toolbox-ready", startListening);
gDevTools.on("toolbox-destroyed", stopListening);

var panel = require("sdk/panel").Panel({
  width: 240,
  height: 300,
  contentURL: self.data.url("panel.html"),
  contentScriptFile: self.data.url("panel.js")
});

function getToolboxDocument() {
  let chromeWindow = windowUtils.getMostRecentBrowserWindow();
  let chromeTab = tabUtils.getActiveTab(chromeWindow);
  let target = devtools.TargetFactory.forTab(chromeTab);
  let toolbox = gDevTools.getToolbox(target);
  if (toolbox) {
    return toolbox.doc;
  }
  return undefined;
}

function startListening() {
  let doc = getToolboxDocument();
  if (doc != undefined) {
    doc.addEventListener("mousemove", handleMousemove, false);
  }
}

function stopListening() {
  let doc = getToolboxDocument();
  if (doc != undefined) {
    doc.removeEventListener("mousemove", handleMousemove);
  }
}

function resetPanel() {
  currentCssProperty = "";
  currentNode = undefined;
  panel.hide();
  panel.port.emit("cleanup");
}

function handleMousemove(e) {
  target = e.target;
  if (target.className.indexOf(cssPropertyNameClass) != -1) {
    if (target.textContent != currentCssProperty) {
      currentCssProperty = target.textContent;
      currentNode = target;
      currentNodeName = currentNode.textContent;
      panel.hide();
      getTheDocSummary();
    }
  }
  else {
    resetPanel();
  }
}

function getTheDocSummary() {
  let mdnRequest = require("sdk/request").Request({
    url: "https://developer.mozilla.org/en-US/search.json?q=" + currentCssProperty + "&topic=css",
    onComplete: getTheExample
  });
  mdnRequest.get();
}

function getTheExample(response) {
  if (currentNode == undefined) {
    return;
  }
  if (currentNode.textContent != currentNodeName) {
    return;
  }
  if (response.status == 200) {
    let json = response.json;
    currentOverviewText = json.documents[0].excerpt;
    currentURL = json.documents[0].url;
    getExample(currentNode.textContent);
  }
}

/**/
function gotExample(example) {
  if (currentNode == undefined) {
    return;
  }
  if (currentNode.textContent != currentNodeName) {
    return;
  }
  panel.postMessage({
      "element": currentNode.textContent,
      "excerpt": currentOverviewText,
      "url": currentURL,
      "example": example 
    });
  panel.show(currentNode);
}

function getExample(propertyName) {
  css.getExample(propertyName, gotExample);
}

/*handle the tooltip panel asking us to open the MDN page*/
function openLink(link) {
  tabs.open({
    url: link,
    inBackground: true
  });
}

panel.port.on("open-link", openLink);
