var url = undefined;
var propertyName = undefined;

self.on("message", function(message) {

  let heading = document.getElementById("title");
  heading.textContent = message.element;

  let overview = document.getElementById("overview");
  overview.innerHTML = message.excerpt;

  //let exampleDiv = document.getElementById("example");
  //exampleDiv.innerHTML = message.example;

  url = message.url;
  propertyName = message.element;

  let highlights = document.getElementsByTagName("em");
  for (let i = 0; i < highlights.length; i++) {
    highlights[i].classList.add("theme-fg-color5");
  }

  let links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.add("theme-link");
    links[i].addEventListener("click", handleLinkClick, false);
  }

  let visitPage = document.getElementById("visit-page-button");
  visitPage.href = message.url;
  visitPage.addEventListener("click", handleLinkClick, false);
});

function handleLinkClick(e) {
  e.stopPropagation();
  e.preventDefault();
  let link = e.target.href + '?utm_campaign=search-api&utm_source=firefox&utm_medium=inspector';
  self.port.emit("open-link", link);
}
