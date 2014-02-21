var url = undefined;
var propertyName = undefined;

self.on("message", function(message) {

  let heading = document.getElementById("title");
  heading.textContent = message.element;

  let overview = document.getElementById("overview");
  overview.innerHTML = message.excerpt;

  let exampleDiv = document.getElementById("example");
  exampleDiv.innerHTML = message.example;

  url = message.url;
  propertyName = message.element;

  let highlights = document.getElementsByTagName("em");
  for (let i = 0; i < highlights.length; i++) {
    highlights[i].classList.add("theme-fg-color5");
  }

  let visitPage = document.getElementById("visit-page-button");
  visitPage.addEventListener("click", handleVisitPageClick, false);
});

function handleVisitPageClick(e) {
  e.stopPropagation();
  e.preventDefault();
  self.port.emit("open-link", url);
}