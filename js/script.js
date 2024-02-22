const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
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
        repoList.append(repoItem);
    }
}