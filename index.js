// The goal is render a github informations on a page with:
// Promises, Map and Reduce.

function httpGetAsync(theUrl, callback1) {
     let xmlHttp = new XMLHttpRequest();
     xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
               callback1(JSON.parse(xmlHttp.responseText));
              }
     xmlHttp.open("GET", theUrl, true);
     xmlHttp.send();

}

class GitHubUser {
     constructor(username) {
          this.username = username;

     }
     getUserInformation() {
          let theUrl = 'https://api.github.com/users/' + this.username;
          return new Promise(function (resolve) {
               httpGetAsync(theUrl, resolve);
          });
     }
     getRepos() {
          let theUrl = 'https://api.github.com/users/' + this.username + '/repos';
          return new Promise(function (resolve) {
               httpGetAsync(theUrl, resolve);
          });

     }
     render() {
          let list = "<h1>User information</h1>";
          console.log(this.user);
          list += '<h3>' + 'Id: ' + this.user.login + '<br>' + 'Name: ' + this.user.name + '</h3>' + '<img width=250px height=250px src="' + this.user.avatar_url + '">';
          list += '<h2>Repository informations</h2>' + `<ul>
         ${this.repos.reduce((p, i) => p + `<li><a target="_blank" href="${i.html_url}">${i.name}</a></li>`, '')}
         </ul>`;
          return list;
     }
}

function Render(element, html) {
     document.getElementById(element).innerHTML = html;
}


let gitUser = new GitHubUser('aymankanon');

gitUser.getUserInformation().then(function (information) {
     gitUser.user = information;
     return gitUser.getRepos();
}).then(function (repos) {
     gitUser.repos = repos;
     Render('githubView', gitUser.render());
});