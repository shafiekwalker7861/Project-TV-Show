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
  episodeCard.id = `episode-${episode.id}`;

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

function setupEpisodeSelector() {
  const rootElem = document.getElementById("root");

  const selectorContainer = document.createElement("div");

  const label = document.createElement("label");
  label.setAttribute("for", "episode-selector");
  label.textContent = "Select episode: ";

  const episodeSelector = document.createElement("select");
  episodeSelector.id = "episode-selector";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choose an episode";

  episodeSelector.appendChild(defaultOption);

  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");

    option.value = episode.id;
    option.textContent =
      `${getEpisodeCode(episode)} - ${episode.name}`;

    episodeSelector.appendChild(option);
  });

  selectorContainer.appendChild(label);
  selectorContainer.appendChild(episodeSelector);

  rootElem.parentNode.insertBefore(selectorContainer, rootElem);

  episodeSelector.addEventListener("change", function () {
    if (episodeSelector.value === "") {
      return;
    }

    const searchInput = document.getElementById("search-input");

    searchInput.value = "";

    makePageForEpisodes(allEpisodes);

    const selectedEpisode = document.getElementById(
      `episode-${episodeSelector.value}`
    );

    selectedEpisode.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function setup() {
  allEpisodes = getAllEpisodes();

  setupSearch();
  setupEpisodeSelector();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;