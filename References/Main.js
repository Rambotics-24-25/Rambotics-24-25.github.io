// Variables and Constants

const headHTML = `
  `;

const bodyHTML = `
  `;

let warnRotate = 30;
let warn;
let boomRotate = 360;
let boom;

// Functions

function numForm(num) {
  
  let numStr = '' + num;
  let out = '';
  
  for(let i = 0; i < numStr.length; i++) {
    
    pos = numStr.length - i - 1;
    add = i % 3 == 0 && i != 0;
    
    if(add) out = ',' + out;
    
    out = numStr[pos] + out;
    
  }
  
  return out;
  
}

// Data

function clearData() {
  
  if(window.confirm('Clear All Data?')) {
    
    localStorage.clear();
    
    outputData();
    
  }
  
}

function removeData(key) {
  
  if(window.confirm('Remove "' + key + '"?')) {
    
    localStorage.removeItem(key);
    
    outputData();
    
  }
  
}

function outputData() {
  
  // Variables
  
  let barElem = document.getElementsByClassName('dataBar')[0];
  let textElem = document.getElementById('data');
  let DTElem = document.getElementById('DT');
  let DTSect = document.getElementById('DT Sect');
  let warn = document.getElementsByClassName('warn')[0];
  let boom = document.getElementsByClassName('BOOM')[0];
  
  let quota = 5 * 1024 * 1024;
  let usage = 0;
  
  DTElem.innerHTML = `
    <tr>
      <th style="width: 25%;">Key</th>
      <th style="width: 75%;">Data</th>
      <th style="width: 6rem;">Delete</th>
    </tr>
    `
  
  // Item Loop
  
  for(let key in localStorage) {
    if(localStorage.hasOwnProperty(key)) {
      item = localStorage.getItem(key);
      
      usage += item.length;
      
      // Table
      
      let rowElem = document.createElement('tr');
      DTElem.appendChild(rowElem);
      
      let keyElem = document.createElement('td');
      keyElem.innerText = key;
      rowElem.appendChild(keyElem);
      
      let dataElem = document.createElement('td');
      dataElem.innerText = '' + item;
      rowElem.appendChild(dataElem);
      
      let remElem = document.createElement('td');
      rowElem.appendChild(remElem);
      
      let remBttnElem = document.createElement('button');
      remBttnElem.innerText = '❌';
      remBttnElem.className = 'dataBttn'
      remBttnElem.title = 'Remove';
      remBttnElem.onclick = function() {removeData(key);}
      remElem.appendChild(remBttnElem);
      
    }
  }
  
  // Sect
  
  if(DTSect.style.maxHeight !=  "0px") {
    DTSect.style.maxHeight = "" + (DTSect.scrollHeight + 100) + "px";
  }
  
  // Bar & Text
  
  frac = usage/quota;
  percent = frac * 100;
  
  red = (frac * 2) * 255;
  green =  (2 - (frac * 2)) * 255;
  color = 'rgb(' + red + ',' + green + ',0)';
  
  textElem.innerHTML = '' + numForm(usage) + 
                       ' Bytes / ' + numForm(quota) + 
                       ' Bytes (' + Math.floor(percent) + '%)';
  
  barElem.style.width = '' + percent + '%';
  barElem.style.backgroundColor = color;
  
  // Warning
  
  if(frac > 0.9) {
    warn.style.display = 'block';
    warn.style.rotate = '0deg';
  }
  else warn.style.display = 'none';
  
  if(frac > 1) boom.style.display = 'block';
  else boom.style.display = 'none';
  
}

// Events

document.addEventListener('DOMContentLoaded', function () {
  
  outputData();
  
  warn = document.getElementsByClassName('warn')[0];
  boom = document.getElementsByClassName('BOOM')[0];
  
  setInterval(function() {
    warnRotate = warnRotate * -1;
    if(frac > 0.95) warn.style.rotate = '' + warnRotate + 'deg';
  }, 1000);
  
  boom.style.rotate = '' + boomRotate + 'deg';
  setInterval(function() {
    boomRotate = boomRotate * -1;
    boom.style.rotate = '' + boomRotate + 'deg';
    boom.style.opacity = '1';
  }, 5000);
  
});
