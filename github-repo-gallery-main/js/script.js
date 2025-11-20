// section to display user info 
const overview = document.querySelector(".overview");

//github username 
const username = "AirelleM";

const getGitHubUser = async function () {
    const response = await fetch (`https://api.github.com/users/${username}`);
    const data = await response.json ();
    console.log(data); 
    displayUserInfo (data);
};


const displayUserInfo = function (data) {
    const userInfo = document.createElement ("div");
    userInfo.classList.add ("user-info");
    userInfo.innerHTML= ` 
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

    overview.append (userInfo);
};

getGitHubUser();