const tabUtils = require("sdk/tabs/utils");
const windowUtils = require("sdk/window/utils");
const { ActionButton } = require("sdk/ui/button/action");
const base64 = require("sdk/base64");
const self = require("sdk/self");
const {Cc, Ci, Cu} = require("chrome");
Cu.import("resource:///modules/devtools/gDevTools.jsm");
Cu.import("resource://gre/modules/devtools/Loader.jsm");

const cssPropertyNameClass = "ruleview-propertyname";
let currentCssProperty = "";
let currentNode = undefined;
let checked = false;

var button = ActionButton({
    id: "my-button",
    label: "my button",
    icon: "./help_32_not_pressed.png",
    onClick: toggleListening
  });

var panel = require("sdk/panel").Panel({
  width: 240,
  height: 300,
  contentURL: self.data.url("panel.html"),
  contentScriptFile: self.data.url("panel.js")
});

function toggleListening(state) {
  if (!checked) {
    checked = true;
    button.icon = "./help_32_pressed.png";
    startListening();
  }
  else {
    checked = false;
    button.icon = "./help_32_not_pressed.png";
    stopListening();
  }
}

function getToolboxDoc() {
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
  let doc = getToolboxDoc();
  if (doc != undefined) {
    doc.addEventListener("mousemove", handleMousemove, false);
  }
}

function stopListening() {
  let doc = getToolboxDoc();
  if (doc != undefined) {
    doc.removeEventListener("mousemove", handleMousemove);
  }
}

function handleMousemove(e) {
  target = e.target;
  if (target.className.indexOf(cssPropertyNameClass) != -1) {
    if (target.textContent != currentCssProperty) {
      currentCssProperty = target.textContent;
      currentNode = target;
      panel.hide();
      getTheDocs();
    }
  }
  else {
    currentCssProperty = "";
    currentNode = undefined;
    panel.hide();
  }
}

function getTheDocs() {
  var mdnRequest = require("sdk/request").Request({
    url: "https://developer.mozilla.org/en-US/search.json?q=" + currentCssProperty + "&topic=css",
    onComplete: showTheDocs
  });
  mdnRequest.get();
}

function showTheDocs(response) {
  if (currentNode == undefined) {
    return;
  }
  if (response.status == 200) {
    let json = response.json;
    let excerpt = json.documents[0].excerpt;
    panel.postMessage(excerpt);
    panel.show(currentNode);
  }
}
