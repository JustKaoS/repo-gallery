const overview = document.querySelector(".overview");
const username = `daniel-r-mott`;

const gitFetch = async function() {
   const request = await fetch(`https://api.github.com/users/${username}`);
   const data = await request.json();
   displayInfo(data);
   console.log(data);
}

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
};