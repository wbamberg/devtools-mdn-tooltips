self.on("message", function(message) {

  let heading = document.getElementById("title");
  heading.textContent = message.title;

  let excerpt = document.getElementById("excerpt");

  excerpt.innerHTML = message.excerpt;

  let highlights = document.getElementsByTagName("em");
  for (let i = 0; i < highlights.length; i++) {
    highlights[i].classList.add("ruleview-propertyname","theme-fg-color5");
  }
});