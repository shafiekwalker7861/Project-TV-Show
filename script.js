// You can edit ALL of the code here

function getEpisodeCode(episode) {
  const seasonNumber = String(episode.season).padStart(2, "0");
  const episodeNumber = String(episode.number).padStart(2, "0");

  return `S${seasonNumber}E${episodeNumber}`;
}

function createEpisodeCard(episode) {
  const episodeCard = document.createElement("div");
  episodeCard.classList.add("episode-card");

  const heading = document.createElement("h2");
  heading.textContent = `${episode.name} - ${getEpisodeCode(episode)}`;

  const episodeImage = document.createElement("img");
  episodeImage.src = episode.image.medium;
  episodeImage.alt = `Image for ${episode.name}`;

  const episodeSummary = document.createElement("div");
  episodeSummary.innerHTML = episode.summary;

  episodeCard.appendChild(heading);
  episodeCard.appendChild(episodeImage);
  episodeCard.appendChild(episodeSummary);

  return episodeCard;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const episodeCount = document.getElementById("episode-count");

  rootElem.textContent = "";
  episodeCount.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach((episode) => {
    const episodeCard = createEpisodeCard(episode);
    rootElem.appendChild(episodeCard);
  });
}

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;