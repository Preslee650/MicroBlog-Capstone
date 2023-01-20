/* Posts Page JavaScript */
"use strict";

//This function is used to make a GET request to a server

function DisplayAllPost() {
  let element = document.getElementById("displayPostHere");

  let myHeaders = new Headers();

  let loginData = getLoginData();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + loginData.token);

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  //This code is making a fetch request to the specified url with the given requestOptions.
  
  fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=2000&offset=0",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      document.getElementById("post").innerHTML = result.map(postTemplate).join(" ")
  
  })

//post template section for the card including name, text and when its created

}
DisplayAllPost();

function postTemplate(post) {
  return `<div class="card">

<div class="card-content">

<h3 class="card-title">${post.username}</h3>
</div>
<p class="card-description">${post.text}</p>
<p>${post.createdAt}</p>
</div>
</div>`
  element.innerHTML += postTemplate;
}

