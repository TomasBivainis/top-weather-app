import "./style.css";

const weather_api_key = "QDW43YS2A2R6WLZYSGL3HQUUU";
const gipht_api_key = "8r8kxe3wcVkQ3gZGBHbBZblOKyZ5qsIH";

document.querySelector("#submit").addEventListener("click", async () => {
  const divLoading = document.querySelector("#loading");
  divLoading.hidden = false;

  const location = document.querySelector("#location").value;

  let data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weather_api_key}`,
    { mode: "cors" }
  );

  data = await data.json();

  let response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=8r8kxe3wcVkQ3gZGBHbBZblOKyZ5qsIH&s=${data.currentConditions.conditions}`,
    { mode: "cors" }
  );

  response = await response.json();

  console.log(data);
  console.log(response);

  const divResults = document.querySelector(".results");
  divResults.innerHTML = "";

  const h1Title = document.createElement("h1");
  h1Title.classList.add("title");
  h1Title.innerHTML = `Today in ${data.resolvedAddress} the forecast is:`;
  divResults.appendChild(h1Title);

  const h2Description = document.createElement("h2");
  h2Description.classList.add("description");
  h2Description.innerHTML = data.description;
  divResults.appendChild(h2Description);

  divLoading.hidden = true;

  if (response.data.length === 0) {
    throw new Error(`0 gifs found.`);
  }

  const img = document.createElement("img");
  img.src = response.data.images.original.url;
  divResults.appendChild(img);
});
