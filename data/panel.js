var url = undefined;
var propertyName = undefined;

self.on("message", function(message) {

  let heading = document.getElementById("title");
  heading.textContent = message.element;

  let excerpt = document.getElementById("excerpt");
  excerpt.innerHTML = message.excerpt;

  url = message.url;
  propertyName = message.element;

  let highlights = document.getElementsByTagName("em");
  for (let i = 0; i < highlights.length; i++) {
    highlights[i].classList.add("ruleview-propertyname","theme-fg-color5");
  }

  let getExample = document.getElementById("example");
  getExample.addEventListener("click", handleExampleClick, false);

  let visitPage = document.getElementById("visit-page");
  visitPage.addEventListener("click", handleVisitPageClick, false);
});

function handleExampleClick() {
  self.port.emit("get-example", propertyName);
}

function handleVisitPageClick(e) {
  e.stopPropagation();
  e.preventDefault();
  self.port.emit("open-link", url);
}