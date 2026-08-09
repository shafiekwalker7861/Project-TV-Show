// You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const episodeCount = document.getElementById("episode-count");

  episodeCount.textContent = `Got ${episodeList.length} episode(s)`;

  for (const episode of episodeList) {
    const episodeName = episode.name;

    const seasonNumber = String(episode.season).padStart(2, "0");
    const episodeNumber = String(episode.number).padStart(2, "0");
    const episodeCode = `S${seasonNumber}E${episodeNumber}`;

    const episodeCard = document.createElement("div");
    episodeCard.classList.add("episode-card");

    const heading = document.createElement("h2");
    heading.textContent = `${episodeName} - ${episodeCode}`;

    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.alt = `Image for ${episodeName}`;

    const episodeSummary = document.createElement("div");
    episodeSummary.innerHTML = episode.summary;

    episodeCard.appendChild(heading);
    episodeCard.appendChild(episodeImage);
    episodeCard.appendChild(episodeSummary);

    rootElem.appendChild(episodeCard);
  }
}

window.onload = setup;