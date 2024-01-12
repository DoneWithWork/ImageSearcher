const access_key  ="your own api key"

const searchForm = document.getElementById("search-form");
const searchBox= document.getElementById("search-box");
const searchResult = document.getElementById("search-results");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1
async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access_key}&per_page=12`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
        }

        const data = await response.json();
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
    }
}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    page = 1;
    searchImages();
})
showMoreBtn.addEventListener("click",()=>{
  page++
  searchImages()  
})
