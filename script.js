function createEpisodeCard(episode) {
  const seasonNumber = String(episode.season).padStart(2, "0");
  const episodeNumber = String(episode.number).padStart(2, "0");
  const episodeCode = `S${seasonNumber}E${episodeNumber}`;

  const card = document.createElement("div");
  card.className = "episode-card";

  const heading = document.createElement("h2");
  heading.textContent = `${episodeCode} - ${episode.name}`;
  card.appendChild(heading);

  const image = document.createElement("img");
  image.src = episode.image.medium;
  image.alt = `Image for ${episode.name}`;
  card.appendChild(image);

  const summary = document.createElement("div");
  summary.innerHTML = episode.summary;
  card.appendChild(summary);

  return card;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  rootElem.textContent = "";

  const counter = document.createElement("p");
  counter.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(counter);

  episodeList.forEach((episode) => {
    const card = createEpisodeCard(episode);
    rootElem.appendChild(card);
  });
}

window.onload = function () {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
};