window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});


function afficherInfo(numeroDiv) {
  const content = document.getElementById(`content${numeroDiv}`);
  const infoDisplay = document.getElementById("infoDisplay");

  const allContent = document.querySelectorAll('[id^="content"]');
  allContent.forEach((item) => {
    item.style.display = "none";
  });

  // Retirer la classe 'active' de tous les éléments
  const allItems = document.querySelectorAll(".item");
  allItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Ajouter la classe 'active' à l'élément cliqué
  const clickedItem = document.getElementById(`div${numeroDiv}`);
  clickedItem.classList.add("active");

  // Afficher le contenu spécifique au div cliqué
  content.style.display = "block";
}

const toggleButton2 = document.getElementById("toggle-info");
const additionalInfo = document.querySelector(".additional-info");



const matchTournament = document.querySelector(".match-tournament");

// URL de l'API et votre clé API (remplacez '_your_account_APIkey_' par votre clé)
const apiUrl =
  "https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=met=Leagues&APIkey=646f41be9b4413762dabd6e0f85e3c041b890e1a3922e33d7f3d3341f0753664";

// Sélection de l'élément table où les résultats seront affichés
const table = document.querySelector(".styled-table");

// Fonction pour afficher les résultats dans la table
function afficherResultats(resultats) {
  // Boucle à travers les résultats de l'API
  const leagueNameDisplay = document.getElementById("leagueNameDisplay"); // Sélection de l'élément où afficher le nom de la ligue
  const leagueLogoDisplay = document.getElementById("leagueLogoDisplay"); // Sélection de l'élément où afficher le logo de la ligue
  for (let i = 0; i < Math.min(resultats.length, 10); i++) {
    const leagueName = resultats[i].league_name;
    const logoUrl = resultats[i].league_logo;

    // Création des éléments HTML pour afficher les résultats
    if (logoUrl && logoUrl.trim() !== "") {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      const logo = document.createElement("img");

      cell.appendChild(logo);
      cell.appendChild(document.createTextNode(leagueName));
      row.appendChild(cell);
      table.appendChild(row);

      // Attribution des attributs src et alt à l'élément img pour afficher le logo
      logo.src = logoUrl;
      // logo.alt = `Logo ${i + 1}`;
      logo.classList.add("logo");

      // Ajout d'un gestionnaire d'événements click à chaque ligne pour récupérer le nom de la ligue
      row.addEventListener("click", function () {
        console.log("Nom de la ligue:", leagueName);
        // Vous pouvez utiliser leagueName comme vous le souhaitez ici
        leagueNameDisplay.textContent = leagueName; // Mettre à jour le nom de la ligue dans l'élément HTML
        leagueLogoDisplay.src = logoUrl; // Mettre à jour le logo de la ligue dans l'élément HTML
      });
    }
  }
}

// Requête à l'API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Vérification si la réponse de l'API contient des données de ligue
    if (data.hasOwnProperty("result")) {
      const leagues = data.result;

      // Appel de la fonction pour afficher les résultats dans la table
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


  function afficherMatches(matches_resultats) {
    const matchContainer = document.querySelector('.match-content');
  
    for (let i = 0; i < Math.min(matches_resultats.length, 5); i++) {
      const firstTeamName = matches_resultats[i].event_home_team;
      const firstLogo = matches_resultats[i].home_team_logo;
      const Date = matches_resultats[i].event_date;
      const Hour = matches_resultats[i].event_time;
      const Score = matches_resultats[i].event_final_result;
      const AwayLogo = matches_resultats[i].away_team_logo;
      const AwayName = matches_resultats[i].event_away_team;
  
      // Création des éléments HTML pour afficher les résultats
      const matchDiv = document.createElement('div');
      matchDiv.classList.add('match');
  
      // Colonne pour l'équipe à domicile
      const columnHome = document.createElement('div');
      columnHome.classList.add('column');
      const teamHome = document.createElement('div');
      teamHome.classList.add('team', 'team--home');
      const teamLogoHome = document.createElement('div');
      teamLogoHome.classList.add('team-logo');
      const imgHome = document.createElement('img');
      imgHome.src = firstLogo;
      const teamNameHome = document.createElement('a');
      teamNameHome.classList.add('team-name');
      teamNameHome.textContent = firstTeamName;
  
      teamLogoHome.appendChild(imgHome);
      teamHome.appendChild(teamLogoHome);
      teamHome.appendChild(teamNameHome);
      columnHome.appendChild(teamHome);
  
      // Colonne pour les détails du match
      const columnDetails = document.createElement('div');
      columnDetails.classList.add('column');
      const matchDetails = document.createElement('div');
      matchDetails.classList.add('match-details');
      const matchDateElem = document.createElement('div');
      // matchDateElem.classList.add('match-date');
      // matchDateElem.textContent = Date;
      const matchHourElem = document.createElement('p');
      matchHourElem.id = 'hour';
      matchHourElem.textContent = Hour;
      const matchScoreElem = document.createElement('div');
      matchScoreElem.classList.add('match-score');
      matchScoreElem.textContent = Score;
      // const matchStatusElem = document.createElement('div');
      // matchStatusElem.classList.add('match-time-lapsed');
      // matchStatusElem.textContent = Status;
  
      matchDetails.appendChild(matchDateElem);
      matchDetails.appendChild(matchHourElem);
      matchDetails.appendChild(matchScoreElem);
      columnDetails.appendChild(matchDetails);
  
      // Colonne pour l'équipe à l'extérieur
      const columnAway = document.createElement('div');
      columnAway.classList.add('column');
      const teamAway = document.createElement('div');
      teamAway.classList.add('team', 'team--away');
      const teamLogoAway = document.createElement('div');
      teamLogoAway.classList.add('team-logo');
      const imgAway = document.createElement('img');
      imgAway.src = AwayLogo;
      const teamNameAway = document.createElement('a');
      teamNameAway.classList.add('team-name');
      teamNameAway.textContent = AwayName;
  
      teamLogoAway.appendChild(imgAway);
      teamAway.appendChild(teamLogoAway);
      teamAway.appendChild(teamNameAway);
      columnAway.appendChild(teamAway);
  
      // Assemblage des colonnes dans la structure du match
      matchDiv.appendChild(columnHome);
      matchDiv.appendChild(columnDetails);
      matchDiv.appendChild(columnAway);
  
      matchContainer.appendChild(matchDiv);

      // if (index < matchesList.length - 1) {
      //   const hrElement = document.createElement('hr');
      //   hrElement.classList.add('match-separator');
      //   matchContainer.appendChild(hrElement);
      // }
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

// Sélection de l'élément table où les résultats seront affichés
const tablee = document.querySelector(".styled-table-contries");

// Fonction pour afficher les résultats dans la table
function afficherPays(resultats) {
  
  for (let i = 0; i < Math.min(resultats.length, 10); i++) {
    const countryName = resultats[i].country_name;
    const countryUrl = resultats[i].country_logo;

    // Création des éléments HTML pour afficher les résultats
   // if (countryUrl && countryUrl.trim() !== "") {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      const logo = document.createElement("img");

      cell.appendChild(logo);
      cell.appendChild(document.createTextNode(countryName));
      row.appendChild(cell);
      tablee.appendChild(row);

      // Attribution des attributs src et alt à l'élément img pour afficher le logo
      logo.src = countryUrl;
      // logo.alt = `Logo ${i + 1}`;
      logo.classList.add("logo");

      // Ajout d'un gestionnaire d'événements click à chaque ligne pour récupérer le nom de la ligue
      // row.addEventListener("click", function () {
      //   console.log("Nom de la ligue:", countryName);
      //   // Vous pouvez utiliser leagueName comme vous le souhaitez ici
       
      // });
    //}
  }
}


fetch(apiUrl3)
  .then((response) => response.json())
  .then((data) => {
    // Vérification si la réponse de l'API contient des données de ligue
    if (data.hasOwnProperty("result")) {
      const pays = data.result;
      console.log(pays);
      // Appel de la fonction pour afficher les résultats dans la table
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
    const newsContainer = document.querySelector('.news-container');
  
    // Nettoyer le contenu existant
    newsContainer.innerHTML = '';
  
    for (let i = 0; i < Math.min(resultats.length, 4); i++) {
      const newsTitle = resultats[i].title;
      const newsUrl = resultats[i].url;
      const newsSource = resultats[i].source.name;
      const newsImage = resultats[i].urlToImage;
      const publishedDate = new Date(resultats[i].publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
      // Création des éléments HTML pour afficher les données de l'API
      const article = document.createElement('article');
      article.classList.add('article');
  
      const title = document.createElement('h2');
      title.classList.add('article-title');
      title.textContent = newsTitle;
  
      const link = document.createElement('a');
      link.href = newsUrl;
      link.target = '_blank'; // Ouvrir le lien dans un nouvel onglet
  
      const content = document.createElement('p');
      content.classList.add('article-content');
      content.textContent = `Source: ${newsSource}, Published: ${publishedDate}`;
  
      const image = document.createElement('img');
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
      console.error("Erreur lors de la récupération des données d'articles :", error)
    );
  
