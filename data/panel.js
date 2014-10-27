var url = undefined;
var propertyName = undefined;

self.on("message", function(message) {

  let heading = document.getElementById("title");
  heading.textContent = message.element;

  let overview = document.getElementById("overview");
  overview.textContent = message.summary;

  let examplePre = document.getElementById("example");
  examplePre.textContent = message.example;

  let visitPage = document.getElementById("visit-page-button");
  visitPage.href = message.url;
  console.log("url arg: " + url);

  console.log("url: " + visitPage.href);
  visitPage.addEventListener("click", handleLinkClick, false);
});

function handleLinkClick(e) {
  e.stopPropagation();
  e.preventDefault();
  let link = e.target.href + '?utm_campaign=search-api&utm_source=firefox&utm_medium=inspector';
  self.port.emit("open-link", link);
}
