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
  while(imagesOnDisplay.length<3){
    var random=Math.floor(Math.random() * allProducts.length);
    var isUnique=true;
    console.log('random number', random);
    for(var p=0;p<randomNumbersThree.length;p++){
      if(randomNumbersThree[p]===random||randomNumbersSix[p]===random){
        isUnique=false;
        console.log('duplicate found');
      }
    }


    if(isUnique===true){
      randomNumbersSix=randomNumbersThree;
      randomNumbersThree.push(random);
      // var pictureDisplay = allProducts[random];
      // imagesOnDisplay.push(pictureDisplay);
    }
    imagesOnDisplay.push(allProducts[random]);
    allProducts[random].views=+1;
    console.log(allProducts[random].views);
  }


  // var pictureDisplay = allProducts[random];
  // imagesOnDisplay.push(pictureDisplay);

  // }

  imageUpdater(productPicOne, 0);
  imageUpdater(productPicTwo, 1);
  imageUpdater(productPicThree, 2);
}

function handleProductClick(event){
  imagesOnDisplay=[];
  console.log(event.target);
  showRandomProducts();
  // allProducts[random].clickCount++;
}

showRandomProducts();
var productPic=document.getElementById('productPic');
productPic.addEventListener('click', handleProductClick);



//variable inside constructor to track click count
//view count
//increment click ounter on click and clear images off of page
//then run showrandomproiduct
