// section to display user info
const overview = document.querySelector(".overview");

//list of repos
const repoList = document.querySelector(".repo-list");

//section that holds all repos
const repoSection = document.querySelector(".repos");

// section for individual repo data
const repoDataSection = document.querySelector(".repo-data");

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

// CLICK EVENT — ONLY THIS
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

// GET REPO INFO — OUTSIDE LISTENER
const getRepoInfo = async function (repoName) {
  const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await response.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);

  displayRepoInfo(repoInfo, languages);
};

// DISPLAY REPO INFO — ALSO OUTSIDE LISTENER
const displayRepoInfo = function (repoInfo, languages) {
  // clear out any previous repo info
  repoDataSection.innerHTML = "";

  const div = document.createElement("div");
  div.innerHTML = `
    <h2>Name: ${repoInfo.name}</h2>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;

  repoDataSection.append(div);

  // show the repo-data section, hide the repos list
  repoDataSection.classList.remove("hide");
  repoSection.classList.add("hide");
};

getGitHubUser();

