const clone = document.querySelector("#tp").content.cloneNode(true);

clone.querySelector("[data-title=1]").textContent = "tp.title1";