
self.port.on("get-example", function(prop) {
  getExample(prop);
});

let allTheH2 = document.getElementsByTagName("h2");

function getExample(propertyName) {
  for (let i = 0; i < allTheH2.length; i++) {
    let h2 = allTheH2[i];
    if (h2.textContent == propertyName) {
      let parent = h2.parentNode;
      let examples = parent.querySelector("#section_4 pre");
      self.port.emit("example", examples.innerHTML);
    }
  }
}

