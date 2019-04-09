'use strict';
var imagesOnDisplay=[];
var allProducts=[];
var productPicOne=document.getElementById('productPic1');
var productPicTwo=document.getElementById('productPic2');
var productPicThree=document.getElementById('productPic3');

function ProductPic(name){
  this.filepath=`./img/${name}.jpg`;
  this.name=name;
  this.views=0;
  this.clickCount=0;
  allProducts.push(this);
}

var productPicsDisplay=['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
];


var totalClicks=0;

function clickCounter(thisPicture) {
  totalClicks+=1;
  for (var i = 0; i < allProducts.length; i++) {
    if (thisPicture === allProducts[i].name) {
      allProducts[i].clickCount++;
    }
  }
  if(totalClicks===25){
    productPic.removeEventListener('click', handleProductClick);
  }
}

for (var i=0;i<productPicsDisplay.length;i++){
  new ProductPic(productPicsDisplay[i]);
}


function imageUpdater(imageElement, imagePosition){
  imageElement.src=imagesOnDisplay[imagePosition].filepath;
  imageElement.alt=imagesOnDisplay[imagePosition].name;
  imageElement.title=imagesOnDisplay[imagePosition].name;
}

var randomNumbersThree=[];
var randomNumbersSix=[];

function showRandomProducts(){
  randomNumbersThree=[];
  while(imagesOnDisplay.length<3){
    var random=Math.floor(Math.random() * (allProducts.length));
    var isUnique=true;
    console.log('random number', random);
    if(randomNumbersThree.includes(random)||randomNumbersSix.includes(random)){
      isUnique=false;
      console.log('duplicate found', random);
    }

    if(isUnique===true){
      randomNumbersThree.push(random);
      imagesOnDisplay.push(allProducts[random]);
      console.log('second array', randomNumbersSix);
      console.log('first array', randomNumbersThree);
      allProducts[random].views+=1;
      console.log('image number', random, 'number of views', allProducts[random].views);
    }
  }

  imageUpdater(productPicOne, 0);
  imageUpdater(productPicTwo, 1);
  imageUpdater(productPicThree, 2);

  randomNumbersSix=randomNumbersThree;
}

function handleProductClick(event){
  console.log(event.target.title);
  imagesOnDisplay=[];
  clickCounter(event.target.title);
  showRandomProducts();
  // console.log(event.target.title);
}

showRandomProducts();
var productPic=document.getElementById('productPic');
productPic.addEventListener('click', handleProductClick);


// clickCounter();
