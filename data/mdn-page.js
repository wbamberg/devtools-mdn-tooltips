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

/*
Just throw if the node is undefined or not what we expect.
*/
function check(node, tagName) {
  if (!node || node.tagName != tagName) {
    throw new Error("Couldn't find docs node in document");
  }
}

/*
Return the textContent of the first non-whitespace
element in the #Summary section of the document.

It's expected to be a <P> element.
*/
function getSummary() {
  let summary = document.getElementById("Summary");
  check(summary, "H2");

  let firstParagraph = node_after(summary);
  check(firstParagraph, "P");

  return firstParagraph.textContent;
}

/*
Return the textContent of the second non-whitespace
node in the #Syntax section of the document.

Both the first and second nodes are expected to be <PRE> nodes.
*/
function getSyntax() {
  let syntax = document.getElementById("Syntax");
  check(syntax, "H2");

  let firstParagraph = node_after(syntax);
  check(firstParagraph, "PRE");

  let secondParagraph = node_after(firstParagraph);
  check(secondParagraph, "PRE");

  return secondParagraph.textContent;
}

function getTheDocs() {
  try {
    let theDocs = {};
    theDocs.summary = getSummary();
    theDocs.syntax = getSyntax();

    self.port.emit("got-the-docs", theDocs);
  }
  catch(error) {
    self.port.emit("got-error", error.message);
  }
}

getTheDocs();
