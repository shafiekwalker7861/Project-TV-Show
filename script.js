//You can edit ALL of the code here
// no getAllEpisodes() here at all — episodes.js already gives you one

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = "";

  console.log ("epispodelist:", episodeList.length);

  const counter = document.createElement("p");
  counter.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(counter);

  episodeList.forEach((episode) => {
    const seasonCode = String(episode.season).padStart(2, "0");
    const episodeCode = String(episode.number).padStart(2, "0");
    const code = `S${seasonCode}E${episodeCode}`;

    const card = document.createElement("div");
    card.className = "episode-card";

      let heading = document.createElement ("h2");
      heading.textContent = `${code} - ${episode.name}`;
      card.appendChild(heading);
console.log(episode.image);

let image = document.createElement ("img");
      image.setAttribute('src', episode.image.medium);
      card.appendChild(image);

let summary= document.createElement("p");
summary.textContent = episode.summary;
      card.appendChild(summary);

    rootElem.appendChild(card);
  });
}

window.onload = function () {
  const allEpisodes = getAllEpisodes(); // this calls the one from episodes.js
  makePageForEpisodes(allEpisodes);
};