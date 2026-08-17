// You can edit ALL of the code here

let allEpisodes = [];

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
  episodeCount.textContent =
    `Displaying ${episodeList.length} / ${allEpisodes.length} episodes`;

  episodeList.forEach((episode) => {
    const episodeCard = createEpisodeCard(episode);
    rootElem.appendChild(episodeCard);
  });
}

function setupSearch() {
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.id = "search-input";
  searchInput.placeholder = "Search by name or summary";

  const label = document.createElement("label");
  label.setAttribute("for", "search-input");
  label.textContent = "Search episodes: ";

  const rootElem = document.getElementById("root");

  rootElem.parentNode.insertBefore(searchInput, rootElem);
  rootElem.parentNode.insertBefore(label, searchInput);

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredEpisodes = allEpisodes.filter((episode) => {
      const episodeName = episode.name.toLowerCase();
      const episodeSummary = (episode.summary || "").toLowerCase();

      return (
        episodeName.includes(searchTerm) ||
        episodeSummary.includes(searchTerm)
      );
    });

    makePageForEpisodes(filteredEpisodes);
  });
}

function setup() {
  allEpisodes = getAllEpisodes();

  setupSearch();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;