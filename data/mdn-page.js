function is_all_ws( nod )
{
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.textContent));
}

function is_ignorable( nod )
{
  return ( nod.nodeType == 8) || // A comment node
         ( (nod.nodeType == 3) && is_all_ws(nod) ); // a text node, all ws
}

function node_after( sib )
{
  while ((sib = sib.nextSibling)) {
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

function getExample() {
  let summary = document.getElementById("Summary");
  if (!summary || summary.tagName != "H2") {
    sendError(summary);
    return;
  }
  let firstParagraph = node_after(summary);
  if (!firstParagraph || firstParagraph.tagName != "P") {
    sendError(firstParagraph);
    return;
  }
  let summaryText = firstParagraph.textContent;

  let syntax = document.getElementById("Syntax");
  if (!syntax || syntax.tagName != "H2") {
    sendError(syntax);
    return;
  }
  let firstParagraph = node_after(syntax);
  if (!firstParagraph || firstParagraph.tagName != "PRE") {
    sendError(firstParagraph);
    return;
  }

  let secondParagraph = node_after(firstParagraph);
  if (!secondParagraph || secondParagraph.tagName != "PRE") {
    sendError(secondParagraph);
    return;
  }
  let syntaxText = secondParagraph.textContent;

  self.port.emit("got-the-docs", {
    "summary": summaryText,
    "syntax": syntaxText
  });
}

function sendError(element) {
  self.port.emit("error", element + " : " + element.innerHTML + " : " + element.tagName);
}

getExample();
