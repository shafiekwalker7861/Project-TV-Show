let allEpisodes = [];
let allShows = [];

// Stores API results so the same URL is never fetched twice
const apiCache = new Map();

function fetchJsonOnce(url) {
  if (!apiCache.has(url)) {
    const request = fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load data from ${url}`);
      }

      return response.json();
    });

    apiCache.set(url, request);
  }

  return apiCache.get(url);
}

function getEpisodeCode(episode) {
  const seasonNumber = String(episode.season).padStart(2, "0");
  const episodeNumber = String(episode.number).padStart(2, "0");

  return `S${seasonNumber}E${episodeNumber}`;
}

function createEpisodeCard(episode) {
  const episodeCode = getEpisodeCode(episode);

  const card = document.createElement("div");
  card.className = "episode-card";
  card.id = `episode-${episode.id}`;

  const heading = document.createElement("h2");
  heading.textContent = `${episodeCode} - ${episode.name}`;

  const image = document.createElement("img");

  if (episode.image) {
    image.src = episode.image.medium;
  }

  image.alt = `Image for ${episode.name}`;

  const summary = document.createElement("div");
  summary.innerHTML = episode.summary || "No summary available.";

  card.appendChild(heading);

  if (episode.image) {
    card.appendChild(image);
  }

  card.appendChild(summary);

  return card;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  rootElem.textContent = "";

  const counter = document.createElement("p");
  counter.textContent =
    `Displaying ${episodeList.length} / ${allEpisodes.length} episodes`;

  rootElem.appendChild(counter);

  episodeList.forEach((episode) => {
    const card = createEpisodeCard(episode);
    rootElem.appendChild(card);
  });
}

function updateEpisodeSelector() {
  const episodeSelector = document.getElementById("episode-selector");

  episodeSelector.textContent = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choose an episode";

  episodeSelector.appendChild(defaultOption);

  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");

    option.value = episode.id;
    option.textContent = `${getEpisodeCode(episode)} - ${episode.name}`;

    episodeSelector.appendChild(option);
  });
}

function setupSearch() {
  const searchInput = document.getElementById("search-input");

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
  const episodeSelector = document.getElementById("episode-selector");

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

    if (selectedEpisode) {
      selectedEpisode.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

async function loadEpisodesForShow(showId) {
  const rootElem = document.getElementById("root");
  const searchInput = document.getElementById("search-input");

  rootElem.textContent = "Loading episodes...";
  searchInput.value = "";

  try {
    const episodeUrl =
      `https://api.tvmaze.com/shows/${showId}/episodes`;

    allEpisodes = await fetchJsonOnce(episodeUrl);

    updateEpisodeSelector();
    makePageForEpisodes(allEpisodes);
  } catch (error) {
    rootElem.textContent =
      "Sorry, we could not load the episodes. Please try again later.";
  }
}

function setupShowSelector() {
  const showSelector = document.getElementById("show-selector");

  showSelector.addEventListener("change", function () {
    if (showSelector.value === "") {
      return;
    }

    loadEpisodesForShow(showSelector.value);
  });
}

function createControls() {
  const rootElem = document.getElementById("root");

  const controls = document.createElement("div");

  const showLabel = document.createElement("label");
  showLabel.setAttribute("for", "show-selector");
  showLabel.textContent = "Select show: ";

  const showSelector = document.createElement("select");
  showSelector.id = "show-selector";

  const showDefault = document.createElement("option");
  showDefault.value = "";
  showDefault.textContent = "Choose a show";

  showSelector.appendChild(showDefault);

  const searchLabel = document.createElement("label");
  searchLabel.setAttribute("for", "search-input");
  searchLabel.textContent = " Search episodes: ";

  const searchInput = document.createElement("input");
  searchInput.id = "search-input";
  searchInput.type = "search";
  searchInput.placeholder = "Search by name or summary";

  const episodeLabel = document.createElement("label");
  episodeLabel.setAttribute("for", "episode-selector");
  episodeLabel.textContent = " Select episode: ";

  const episodeSelector = document.createElement("select");
  episodeSelector.id = "episode-selector";

  const episodeDefault = document.createElement("option");
  episodeDefault.value = "";
  episodeDefault.textContent = "Choose an episode";

  episodeSelector.appendChild(episodeDefault);

  controls.appendChild(showLabel);
  controls.appendChild(showSelector);
  controls.appendChild(searchLabel);
  controls.appendChild(searchInput);
  controls.appendChild(episodeLabel);
  controls.appendChild(episodeSelector);

  rootElem.parentNode.insertBefore(controls, rootElem);
}

async function setup() {
  const rootElem = document.getElementById("root");

  createControls();

  rootElem.textContent = "Loading TV shows...";

  try {
    allShows = await fetchJsonOnce(
      "https://api.tvmaze.com/shows"
    );

    allShows.sort((showA, showB) =>
      showA.name.localeCompare(showB.name, undefined, {
        sensitivity: "base",
      })
    );

    const showSelector = document.getElementById("show-selector");

    allShows.forEach((show) => {
      const option = document.createElement("option");

      option.value = show.id;
      option.textContent = show.name;

      showSelector.appendChild(option);
    });

    rootElem.textContent =
      "Choose a TV show to display its episodes.";

    setupShowSelector();
    setupSearch();
    setupEpisodeSelector();
  } catch (error) {
    rootElem.textContent =
      "Sorry, we could not load the TV shows. Please try again later.";
  }
}

window.onload = setup;