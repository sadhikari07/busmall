'use strict';

var allProducts=[];
var productPic=document.getElementById('productPic');

function ProductPic(){
  this.filepath=`images/${name}.jpg`;
  this.name=name;
  this.views=0;
  allProducts.push(this);
}

new ProductPic('bag');
new ProductPic('banana');
new ProductPic('bathroom');
new ProductPic('boots');
new ProductPic('breakfast');
new ProductPic('bubblegum');
new ProductPic('chair');
new ProductPic('cthulhu');
new ProductPic('dog-duck');
new ProductPic('dragon');
new ProductPic('pen');
new ProductPic('pet-sweep');
new ProductPic('scissors');
new ProductPic('shark');
new ProductPic('sweep');
new ProductPic('tantum');
new ProductPic('unicorn');
new ProductPic('usb');
new ProductPic('water-can');
new ProductPic('wine-glass');

function showRandomProducts(){
  var random=Math.floor(Math.random() * allProducts.length);

  productPic.src=allProducts[random].filepath;
  productPic.alt=allProducts[random].name;
  productPic.title=allProducts[random].name;
}

function handleProductClick(event){
  showRandomProducts;
}

showRandomProducts();
productPic.addEventListener('click', handleProductClick);
