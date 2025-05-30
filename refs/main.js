// Variables and Constants

const headHTML = `
  `;

const bodyHTML = `
  <div class="navigation">
    
    <a class="nav" title="[1]" href="index.html">Home</a>
    <a class="nav" title="[2]" href="about.html">About Us</a>
    <a class="nav" title="[3]" href="robots.html">Robots</a>
    <a class="nav" title="[4]" href="comps.html">Competitions</a>
    <a class="nav" title="[5]" href="events.html">Other Events</a>
    <a class="nav" title="[6]" href="signUp.html">Sign Up</a>
    
  </div>
  `;

// Variables and Constants

const head = document.getElementsByTagName("head");

const body = document.getElementsByTagName("body");

let timeout;

// Functions

function redirect(href) {
  window.location.href = href;
}

function load(href) {
  
  document.querySelector('body').style = "animation-name: unload;" + 
                                         "animation-duration: 0.5s;";
  
  timeout = setTimeout(redirect, 500, href);
  
}

function shortcut(key, altKey, href) {
  
  keyPressed = event.key == key || event.key == altKey
  
  current = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  
  if(keyPressed && href != current) window.location.href = href;
  
}

function expndOrClps(ID, bttnID) {
  
  sect = document.getElementById(ID);
  bttn = document.getElementById(bttnID);
  height = "" + (sect.scrollHeight + 100) + "px";
  
  if(sect.style.maxHeight ==  "0px") {
    
    sect.style.maxHeight = height;
    bttn.style.transform = "rotate(0deg)";
    
  }
  else {
    
    sect.style.maxHeight = "0px";
    bttn.style.transform = "rotate(270deg)";
    
  }
  
}

function toggleTOC() {
  
  let content = document.getElementsByClassName('content')[0];
  let TOC = document.getElementsByClassName('TOC')[0];
  let TOCBttn = document.getElementsByClassName('TOCBttn')[0];
  
  width = "" + (TOC.scrollWidth + 100) + "px";
  
  if(TOC.style.maxWidth ==  "0px") {
    
    TOC.style.maxWidth = width;
    TOCBttn.style.transform = "rotate(0deg)";
    
  }
  else {
    
    TOC.style.maxWidth = "0px";
    TOCBttn.style.transform = "rotate(270deg)";
    
  }
  
}

// Set Elements

for(let i = 0; i < head.length; i++) head[i].innerHTML += headHTML;

for(let i = 0; i < body.length; i++) body[i].innerHTML += bodyHTML;

// Events

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('body').style = "animation-name: load;" +
                                         "animation-duration: 1s;";
  loadSpin();
});

// :P

let elems = [];
let rotate = 0;
let run = true;
let trigger = '@';

function loadSpin(){
  elems = document.getElementsByTagName('*');
}

function spin() {
  rotate += 360;
  
  for(let i = 0; i < elems.length; i ++) elems[i].style.rotate = '' + rotate + 'deg';
}

document.addEventListener('keypress', function() {
  
  // Navigation
  
  shortcut("1", "1", "index.html");
  shortcut("2", "2", "about.html");
  shortcut("3", "3", "robots.html");
  shortcut("4", "4", "comps.html");
  shortcut("5", "5", "events.html");
  shortcut("6", "6", "signUp.html");
  
  // :P

  if(event.key == trigger && run) {
    run = false;
    spin();
    window.setTimeout(function () {
      run = true;
    }, 10 * 1000);
  }
});
