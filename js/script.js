const overview = document.querySelector(".overview");
const repoListElement = document.querySelector(".repo-list");
const reposElement = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const button = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
const username = `JustKaoS`;

// Fetches Github user data for username
const gitFetch = async function () {
  const request = await fetch(`https://api.github.com/users/${username}`);
  const data = await request.json();
  displayInfo(data);
};

gitFetch();

// Displays github user data
const displayInfo = function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
        `;
  overview.append(userInfo);
  repoFetch();
};

// Fetches Github user repositories
const repoFetch = async function () {
  const request = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await request.json();
  repoInfo(repoData);
  //console.log(repoData);
};

// Displays list of repos if they are not a fork
const repoInfo = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    if (!repo.fork) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}<h3>`;
      repoListElement.append(repoItem);
    }
  }
};

// When repo is clicked in list
repoListElement.addEventListener("click", function (e) {
  if (e.target.matches("li") || e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getInfo(repoName);
  }
});

// Fetches repository info and gh-pages info
const getInfo = async function (repoName) {
  const requestName = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await requestName.json();
  const requestLanguage = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`
  );
  const languageData = await requestLanguage.json();

  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  displayRepoInfo(repoInfo, languages);
};

// Displays repo details
const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  const repoInfoDiv = document.createElement("div");
  repoInfoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
`;
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("buttons");
  buttonDiv.innerHTML = `
<a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;
  // Checks if repo has a ghpages deployment, adds button to visit page
  if (repoInfo.has_pages) {
    buttonDiv.innerHTML += `<a class="visit" href="https://${username}.github.io/${repoInfo.name}" target="_blank" rel="noreferrer noopener">View on GitHub Pages!</a>`;
  }

  repoData.append(repoInfoDiv);
  repoData.append(buttonDiv);
  repoData.classList.remove("hide");
  reposElement.classList.add("hide");
  button.classList.remove("hide");
};

// Returns to main repo list
button.addEventListener("click", function () {
  reposElement.classList.remove("hide");
  repoData.classList.add("hide");
  button.classList.add("hide");
});

// Dynamically adjusts repo list based on user input in search box
filterInput.addEventListener("input", function (e) {
  const searchInput = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchInputLower = searchInput.toLowerCase();
  for (const repo of repos) {
    const repoLower = repo.innerText.toLowerCase();
    if (repoLower.includes(searchInputLower)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
