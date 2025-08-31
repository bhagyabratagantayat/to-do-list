console.log("connected");
let lists = document.querySelectorAll("li");
let btn = document.querySelector("button");



btn.addEventListener("click", () => {
  for (let list of lists) {
    list.innerText = "hello";
  }
});
