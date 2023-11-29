// scrolling with sticky navbar
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// display informations for each sport
function afficherInfo(numeroDiv) {
  const content = document.getElementById(`content${numeroDiv}`);
  const infoDisplay = document.getElementById("infoDisplay");
  const allContent = document.querySelectorAll('[id^="content"]');
  allContent.forEach((item) => {
    item.style.display = "none";
  });
  const allItems = document.querySelectorAll(".item");
  allItems.forEach((item) => {
    item.classList.remove("active");
  });
  const clickedItem = document.getElementById(`div${numeroDiv}`);
  clickedItem.classList.add("active");
  content.style.display = "block";
}

const toggleButton2 = document.getElementById("toggle-info");

// API URL and API key
const apiUrl =
  "https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=met=Leagues&APIkey=646f41be9b4413762dabd6e0f85e3c041b890e1a3922e33d7f3d3341f0753664";
const table = document.querySelector(".styled-table");

// display the table results
function afficherResultats(resultats) {
  const leagueNameDisplay = document.getElementById("leagueNameDisplay"); // Sélection de l'élément où afficher le nom de la ligue
  const leagueLogoDisplay = document.getElementById("leagueLogoDisplay"); // Sélection de l'élément où afficher le logo de la ligue
  for (let i = 0; i < Math.min(resultats.length, 10); i++) {
    const leagueName = resultats[i].league_name;
    const logoUrl = resultats[i].league_logo;

    // Create HTML elements for results
    if (logoUrl && logoUrl.trim() !== "") {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      const logo = document.createElement("img");

      cell.appendChild(logo);
      cell.appendChild(document.createTextNode(leagueName));
      row.appendChild(cell);
      table.appendChild(row);

      logo.src = logoUrl;
      logo.classList.add("logo");

      // row.addEventListener("click", function () {
      //   console.log("Nom de la ligue:", leagueName);
      //   leagueNameDisplay.textContent = leagueName;
      //   leagueLogoDisplay.src = logoUrl;
      // });
    }
  }
}

// Requête à l'API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.hasOwnProperty("result")) {
      const leagues = data.result;
      afficherResultats(leagues);
    } else {
      console.error("Pas de données de ligue disponibles.");
    }
  })
  .catch((error) =>
    console.error(
      "Erreur lors de la récupération des données de ligue :",
      error
    )
  );



// display livescore
function afficherMatches(matches_resultats) {
  const matchContainer = document.querySelector(".match-content");

  for (let i = 0; i < Math.min(matches_resultats.length, 5); i++) {
    const firstTeamName = matches_resultats[i].event_home_team;
    const firstLogo = matches_resultats[i].home_team_logo;
    const Date = matches_resultats[i].event_date;
    const Hour = matches_resultats[i].event_time;
    const Score = matches_resultats[i].event_final_result;
    const AwayLogo = matches_resultats[i].away_team_logo;
    const AwayName = matches_resultats[i].event_away_team;

    // Create HTML elements
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");
    const expandIcon = document.createElement("div");
    expandIcon.classList.add("expand-icon");
    // Ici, tu pourrais ajouter une icône spécifique, par exemple une flèche vers le bas
    expandIcon.innerHTML = '<i class="fas fa-chevron-down"></i>';

    expandIcon.setAttribute('data-match-details', JSON.stringify(matches_resultats[i]));

    // home team
    const columnHome = document.createElement("div");
    columnHome.classList.add("column");
    const teamHome = document.createElement("div");
    teamHome.classList.add("team", "team--home");
    const teamLogoHome = document.createElement("div");
    teamLogoHome.classList.add("team-logo");
    const imgHome = document.createElement("img");
    imgHome.src = firstLogo;
    const teamNameHome = document.createElement("a");
    teamNameHome.classList.add("team-name");
    teamNameHome.textContent = firstTeamName;

    teamLogoHome.appendChild(imgHome);
    teamHome.appendChild(teamLogoHome);
    teamHome.appendChild(teamNameHome);
    columnHome.appendChild(teamHome);

    // match details
    const columnDetails = document.createElement("div");
    columnDetails.classList.add("column");
    const matchDetails = document.createElement("div");
    matchDetails.classList.add("match-details");
    const matchDateElem = document.createElement("div");
    const matchHourElem = document.createElement("p");
    matchHourElem.id = "hour";
    matchHourElem.textContent = Hour;
    const matchScoreElem = document.createElement("div");
    matchScoreElem.classList.add("match-score");
    matchScoreElem.textContent = Score;

    matchDetails.appendChild(matchDateElem);
    matchDetails.appendChild(matchHourElem);
    matchDetails.appendChild(matchScoreElem);
    columnDetails.appendChild(matchDetails);

    //away team
    const columnAway = document.createElement("div");
    columnAway.classList.add("column");
    const teamAway = document.createElement("div");
    teamAway.classList.add("team", "team--away");
    const teamLogoAway = document.createElement("div");
    teamLogoAway.classList.add("team-logo");
    const imgAway = document.createElement("img");
    imgAway.src = AwayLogo;
    const teamNameAway = document.createElement("a");
    teamNameAway.classList.add("team-name");
    teamNameAway.textContent = AwayName;

    teamLogoAway.appendChild(imgAway);
    teamAway.appendChild(teamLogoAway);
    teamAway.appendChild(teamNameAway);
    columnAway.appendChild(teamAway);

    // structure du match
    matchDiv.appendChild(columnHome);
    matchDiv.appendChild(columnDetails);
    matchDiv.appendChild(columnAway);
    matchDiv.appendChild(expandIcon); // Ajout de l'icône à la fin du conteneur du match

    matchContainer.appendChild(matchDiv);
  }
}

const apiUrl2 =
  "https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=646f41be9b4413762dabd6e0f85e3c041b890e1a3922e33d7f3d3341f0753664";

fetch(apiUrl2)
  .then((response) => response.json())
  .then((data) => {
    if (data.hasOwnProperty("result")) {
      const fixtures = data.result;
      afficherMatches(fixtures);
    }
    //   console.error("Pas de données de ligue disponibles.");
    // }
  })
  .catch((error) =>
    console.error(
      "Erreur lors de la récupération des données de ligue :",
      error
    )
  );

const apiUrl3 =
  "https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=646f41be9b4413762dabd6e0f85e3c041b890e1a3922e33d7f3d3341f0753664";

const tablee = document.querySelector(".styled-table-contries");

function afficherPays(resultats) {
  for (let i = 0; i < Math.min(resultats.length, 10); i++) {
    const countryName = resultats[i].country_name;
    const countryUrl = resultats[i].country_logo;

    const row = document.createElement("tr");
    const cell = document.createElement("td");
    const logo = document.createElement("img");

    cell.appendChild(logo);
    cell.appendChild(document.createTextNode(countryName));
    row.appendChild(cell);
    tablee.appendChild(row);

    logo.src = countryUrl;
    logo.classList.add("logo");
  }
}

fetch(apiUrl3)
  .then((response) => response.json())
  .then((data) => {
    if (data.hasOwnProperty("result")) {
      const pays = data.result;
      console.log(pays);
      afficherPays(pays);
    } else {
      console.error("Pas de données de ligue disponibles.");
    }
  })
  .catch((error) =>
    console.error(
      "Erreur lors de la récupération des données de ligue :",
      error
    )
  );

const apiNews =
  "https://gnews.io/api/v4/top-headlines?category=sports&lang=en&country=us&apikey=96e1f4054627e9e79d0bdd4a549fe7e9";

function afficherNews(resultats) {
  const newsContainer = document.querySelector(".news-container");

  newsContainer.innerHTML = "";

  for (let i = 0; i < Math.min(resultats.length, 4); i++) {
    const newsTitle = resultats[i].title;
    const newsUrl = resultats[i].url;
    const newsSource = resultats[i].source.name;
    const newsImage = resultats[i].urlToImage;
    const publishedDate = new Date(resultats[i].publishedAt).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );

    const article = document.createElement("article");
    article.classList.add("article");

    const title = document.createElement("h2");
    title.classList.add("article-title");
    title.textContent = newsTitle;

    const link = document.createElement("a");
    link.href = newsUrl;
    link.target = "_blank"; // Ouvrir le lien dans un nouvel onglet

    const content = document.createElement("p");
    content.classList.add("article-content");
    content.textContent = `Source: ${newsSource}, Published: ${publishedDate}`;

    const image = document.createElement("img");
    image.src = newsImage;
    image.alt = newsTitle;

    link.appendChild(title);
    article.appendChild(link);
    article.appendChild(content);
    article.appendChild(image);
    newsContainer.appendChild(article);
  }
}

fetch(apiNews)
  .then((response) => response.json())
  .then((data) => {
    if (data.hasOwnProperty("articles")) {
      const newsArticles = data.articles;
      afficherNews(newsArticles);
    } else {
      console.error("Pas de données d'articles disponibles.");
    }
  })
  .catch((error) =>
    console.error(
      "Erreur lors de la récupération des données d'articles :",
      error
    )
  );
