const accessKey = "1sQGgkrrX-v2yUEid_F58AVBM8Mxqea3PdqGXkJd9aE";
const searchForm = document.getElementById("search");
const searchBox = document.getElementById("searchbox");
const searchResult = document.getElementById("searchresult");
const showMoreBtn = document.getElementById("showmorebtn");
let keyword = "";
let page = 1;
async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    if(page === 1){
        searchResult.innerHTML = "";
    }
    const results = data.results;
    results.map((result)=> {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    if (results.length > 0) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
}
searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    page = 1;
    searchImages();
});
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});