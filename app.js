//input and buttons variables.
const input = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
const removeBtn = document.querySelector("#remove-btn");
//could not figure out how to hide this key or to access it via the api site
const apiKey = "3rI5DbCSFSpyuSIogoqFvt0ikIOLjpzV";
const imgContainer = document.querySelector("#img-container");

//get url for image and add it to the created img as the source
async function getGif() {
  //make the query accept the input value
  const inputVal = input.value;
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { api_key: apiKey, q: inputVal },
  });
  //give random image idx based on length of return
  let random = Math.floor(Math.random() * (res.data.data.length + 1));
  const randomImg = res.data.data[random];
  const imageUrl = randomImg.images.original.url;
  input.value = "";
  createImg(imageUrl);
}

//create image inside of div container
function createImg(imageUrl) {
  const newImg = document.createElement("img");
  newImg.src = imageUrl;
  imgContainer.append(newImg);
}

function removeGifs() {
  //empty image container
  imgContainer.innerHTML = "";
}

//create event listener for getGif
//had to make it its own function to prevent default, not sure how to get around that.
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  return getGif();
});
//event listener for remove images
removeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  return removeGifs();
});

//this was fun
