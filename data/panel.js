var url = undefined;
var propertyName = undefined;

self.on("message", function(message) {

  let heading = document.getElementById("title");
  heading.textContent = message.element;

  let overview = document.getElementById("overview");
  overview.innerHTML = message.excerpt;

  url = message.url;
  propertyName = message.element;

  let highlights = document.getElementsByTagName("em");
  for (let i = 0; i < highlights.length; i++) {
    highlights[i].classList.add("ruleview-propertyname","theme-fg-color5");
  }

  handleOverviewClick();

  let overview = document.getElementById("overview-button");
  overview.addEventListener("click", handleOverviewClick, false);

  let example = document.getElementById("example-button");
  example.addEventListener("click", handleExampleClick, false);

  let visitPage = document.getElementById("visit-page-button");
  visitPage.addEventListener("click", handleVisitPageClick, false);
});

function gotExample(example) {
 let exampleDiv = document.getElementById("example");
 exampleDiv.innerHTML = example;
}

self.port.on("got-example", gotExample);

function handleOverviewClick() {
  let overview = document.getElementById("overview");
  overview.style.display = "block";
  let example = document.getElementById("example");
  example.style.display = "none";
}

function handleExampleClick() {
  console.log("clicked");
  let overview = document.getElementById("overview");
  overview.style.display = "none";
  let example = document.getElementById("example");
  example.style.display = "block";
}

function handleVisitPageClick(e) {
  e.stopPropagation();
  e.preventDefault();
  self.port.emit("open-link", url);
}