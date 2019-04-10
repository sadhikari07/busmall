'use strict';
var imagesOnDisplay=[];
var allProducts=[];
var countedVotes=[];

//To render three pictures:
var productPicOne=document.getElementById('productPic1');
var productPicTwo=document.getElementById('productPic2');
var productPicThree=document.getElementById('productPic3');

//The following is  a constructor function for all of the images
function ProductPic(name){
  this.filepath=`./img/${name}.jpg`;
  this.name=name;
  this.views=0;
  this.clickCount=0;
  allProducts.push(this);
}

//Array for names/title of all of the images
var productPicsDisplay=['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
];

var totalClicks=0;
//This function counts the number of clicks on each images
function clickCounter(thisPicture) {
  //totalClicks+=1; is for total number of clicks, to set limit at 25 later on.
  totalClicks+=1;
  //This loop counts the clicks on each images:
  for (var i = 0; i < allProducts.length; i++) {
    if (thisPicture === allProducts[i].name) {
      allProducts[i].clickCount++;
    }
  }
  //To set maximum clicks to 25
  if(totalClicks===25){
    productPic.removeEventListener('click', handleProductClick);
    showVotes();

    //This pushes the number of clicks on each images to an array called countedVotes
    for(var j=0;j<allProducts.length; j++){
      countedVotes.push(allProducts[j].clickCount);
    }
    //This function draws the chart after 25 clicks have been made.
    // localStoreMaker();
    updateStoreage();
    letsDrawChart();
  }
}

function updateStoreage(){
  localStorage.setItem('countedVotesStore', JSON.stringify(allProducts));

}

//This is to populate productpic function with images
function initializeProducts(){
  for (var i=0;i<productPicsDisplay.length;i++){
    new ProductPic(productPicsDisplay[i]);
  }
}

function imageUpdater(imageElement, imagePosition){
  imageElement.src=imagesOnDisplay[imagePosition].filepath;
  imageElement.alt=imagesOnDisplay[imagePosition].name;
  imageElement.title=imagesOnDisplay[imagePosition].name;
}

//The following arrays store first three and previous three random numbers consicutively.
var randomNumbersThree=[];
var randomNumbersSix=[];

//This is the function that actually displays the random products on the web page
function showRandomProducts(){
  //We want to start with an empty array to store three random numbers to correspond to three images to be displayed.
  randomNumbersThree=[];
  //Limiting the maximum number of images to be displayed to three.
  while(imagesOnDisplay.length<3){
    //Generating random numbers:
    var random=Math.floor(Math.random() * (allProducts.length));
    var isUnique=true;
    console.log('random number', random);
    //Checking if random number that was just generated is in any of the two arrays.
    //If it is already in an array, roll again, dont store that repeated number.
    if(randomNumbersThree.includes(random)||randomNumbersSix.includes(random)){
      isUnique=false;
      console.log('duplicate found', random);
    }
    //If the random number is not in the array, store that number in the first three numbers array.
    if(isUnique===true){
      randomNumbersThree.push(random);
      imagesOnDisplay.push(allProducts[random]);
      console.log('second array', randomNumbersSix);
      console.log('first array', randomNumbersThree);
      //Tracking the view count of the three images that are being displayed.
      allProducts[random].views+=1;
      console.log('image number', random, 'number of views', allProducts[random].views);
    }
  }

  //updating images on productpicone, productpictwo and productpicthree to link to html
  imageUpdater(productPicOne, 0);
  imageUpdater(productPicTwo, 1);
  imageUpdater(productPicThree, 2);

  //assigning the current three random numbers to an array to keep track for next iteration
  randomNumbersSix=randomNumbersThree;
}

//following function will handle the clicking event
function handleProductClick(event){
  console.log(event.target.title);
  imagesOnDisplay=[];
  //on each click, the clickCounter will identify  which image was clicked and increase the clickcount
  clickCounter(event.target.title);
  //after each clicks, this shows new set of images
  showRandomProducts();
}

//This shows three random images on page load.
//With assistance from TAs:
function localStoreMaker(){
  var productsInStorage=localStorage.getItem('countedVotesStore');
  if (!productsInStorage){
    initializeProducts();
    console.log('initialized', localStorage.length);
    localStorage.setItem('countedVotesStore', JSON.stringify(allProducts));
  }
  else{
    allProducts= JSON.parse(localStorage.getItem('countedVotesStore'));
  }
}

localStoreMaker();
showRandomProducts();
var productPic=document.getElementById('productPic');
productPic.addEventListener('click', handleProductClick);

//This function renders the total number of votes per image on a list in the web page.
function showVotes() {
  var voteList = document.getElementById('voted-list');
  voteList.innerHTML = '';
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].name + ', ' + allProducts[i].clickCount + ' votes';
    voteList.appendChild(liEl);
  }
}

//The following codes have been referenced to: https://www.chartjs.org/docs/2.8.0/
//Lets draw the chart using the following function:
function letsDrawChart(){
  var ctx = document.getElementById('productChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productPicsDisplay,
      datasets: [{
        label: 'Number of Votes',
        data: countedVotes,
        backgroundColor: [
          'red', 'green', 'blue', 'yellow', 'purple',
          'red', 'green', 'blue', 'yellow', 'purple',
          'red', 'green', 'blue', 'yellow', 'purple',
          'red', 'green', 'blue', 'yellow', 'purple',
        ],
        borderColor: [
          'red', 'green', 'blue', 'yellow', 'purple',
          'red', 'green', 'blue', 'yellow', 'purple',
          'red', 'green', 'blue', 'yellow', 'purple',
          'red', 'green', 'blue', 'yellow', 'purple',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
