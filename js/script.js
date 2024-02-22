const overview = document.querySelector(".overview");
const repoListElement = document.querySelector(".repo-list");
const reposElement = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const username = `daniel-r-mott`;

// Fetches Github user data for username
const gitFetch = async function() {
   const request = await fetch(`https://api.github.com/users/${username}`);
   const data = await request.json();
   displayInfo(data);
};

gitFetch();


const displayInfo = function(data) {
    const userInfo = document.createElement("div");
    const userAvatar = data.avatar_url;
    const userFirstLast = data.name;
    const userBio = data.bio;
    const userLocation = data.location;
    const userRepos = data.public_repos;
    userInfo.innerHTML = 
        `
        <figure>
            <img alt="user avatar" src=${userAvatar} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${userFirstLast}</p>
            <p><strong>Bio:</strong> ${userBio}</p>
            <p><strong>Location:</strong> ${userLocation}</p>
            <p><strong>Number of public repos:</strong> ${userRepos}</p>
        </div>
        `
        overview.append(userInfo);
repoFetch();
};

// Fetches Github user repositories
const repoFetch = async function() {
    const request = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await request.json();
    repoInfo(repoData);
};


const repoInfo = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}<h3>`;
        repoListElement.append(repoItem);
    }
};

repoListElement.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getInfo(repoName);

    }
});

const getInfo = async function(repoName) {
    const requestName = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await requestName.json();
    const requestLanguage = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`)
    const languageData = await requestLanguage.json();
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    console.log(languages);
    displayRepoInfo(repoInfo, languages);
  };

  const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
   const repoInfoDiv = document.createElement("div");
   repoInfoDiv.innerHTML =
     `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
     <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoData.append(repoInfoDiv);
    repoData.classList.remove("hide");
    reposElement.classList.add("hide");
  };
