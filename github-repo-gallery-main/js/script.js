// section to display user info
const overview = document.querySelector(".overview");

//list of repos
const repoList = document.querySelector(".repo-list");

//github username
const username = "AirelleM";

const getGitHubUser = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  console.log(data);
  displayUserInfo(data);
};

const displayUserInfo = function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerHTML = `
    <figure>
    <img alt="user avatar"  src=${data.avatar_url} />
    </figure>
    <div> 
    <p> <strong>Name:</strong> ${data.name}</p>
     <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;

  overview.append(userInfo);

  // fetch and display repos after user info loads
  getRepos();
};

const getRepos = async function () {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await response.json();
  console.log(repoData);
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  repos.forEach(function (repo) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  });
};

getGitHubUser();
