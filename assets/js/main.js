const logo = document.getElementById("logo");
const banner = document.getElementById("banner");
const formSearch = document.getElementById("formSearch");
const app = document.getElementById("root");
const footer = document.getElementById("footer");

// Logo
const logoImg = document.createElement("img");
logoImg.src = "./assets/img/ghibli.png";
const logoName = document.createElement("a");
logoName.textContent = "Studio Ghibli";
logoName.href = "./index.html";

// Banner
const bannerImg = document.createElement("img");
bannerImg.src = "./assets/img/logo_ghibli.jpg";
bannerImg.setAttribute("align", "center");

// Search Bar
const searchInput = document.createElement("input");
searchInput.placeholder = "Search films...";
// const searchButton = document.createElement("button");
// searchButton.textContent = "Search";

// Container
const container = document.createElement("div");
container.setAttribute("class", "container");

// Footer
const referenceApi = document.createElement("a");
referenceApi.textContent = "API by Ghibli API";
referenceApi.href = "https://ghibli.rest/docs";
referenceApi.target = "_blank";
const searchBar = document.createElement("a");
searchBar.textContent = "Search Bar by Liang Shi on Dribbble";
searchBar.href = "https://dribbble.com/shots/843289-Search-Bar";
searchBar.target = "_blank";
const writer = document.createElement("h3");
writer.textContent = "Created with 🤍 by Reza Rinaldi";

// Merge Logo
logo.append(logoImg, logoName);

// Banner
banner.append(bannerImg);

// Merge Search Bar
formSearch.append(searchInput);

// Root
app.append(formSearch, container);

// Merge Footer
footer.append(referenceApi, searchBar, writer);

const getDataGhibli = async (searchValue = "") => {
  try {
    const response = await fetch("https://ghibli.rest/films");
    const data = await response.json();

    // Menghapus data yang ada
    container.innerHTML = "";

    // Merubah objek menjadi array []
    data.forEach((item) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = item.title;

        var title = item.title.replace(/[^a-zA-Z]/g, "");
        var url = encodeURI(
          "https://www.studioghibli.com.au/" + title.toLowerCase()
        );

        const img = document.createElement("img");
        img.src = item.image;

        var desc = item.description.substring(0, 300) + "...";
        const p = document.createElement("p");
        p.textContent = desc;

        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.textContent = "more";
        a.target = "_blank";

        card.append(h1, img, p);
        p.appendChild(a);
        container.append(card);
      }
    });
  } catch (e) {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Error, tidak dapat menampilkan data.`;
    errorMessage.style.fontWeight = "bold";
    errorMessage.style.fontSize = "38px";
    app.appendChild(errorMessage);
  }
};

// Event Search Click
// searchButton.addEventListener("click", async () => {
//   getDataGhibli(searchInput.value);
// });

// Event Search Keyup
searchInput.addEventListener("keyup", async () => {
  getDataGhibli(searchInput.value);
});

// Memanggil dan menampilkan data
getDataGhibli();
