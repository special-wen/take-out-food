'use static'
var ITEM = []
function bestCharge(selectedItems) {
  let item = AllItemsMessage(selectedItems).slice(0);
  let eachPrice = sumEachPrice(item).slice(0);
  let noDisconutPrice = sumEachPrice(AllItemsMessage(selectedItems)).slice(0);
  let discountPriceOne = sumDiscountOne(eachPrice).slice(0);
  let discountPriceTwo = sumDiscountTwo(item);
  let price = lastPrice(noDisconutPrice,discountPriceOne,discountPriceTwo);
  let promotions = loadPromotions();
  let str = "============= 订餐明细 =============\n";
  if(price == discountPriceTwo){
    for(let i = 0;i<price.length-2;i++){
      str += price[i].name + " x " + price[i].count + " = " + noDisconutPrice[i].sum + "元\n";
    }
    str += "-----------------------------------\n"+"使用优惠:\n" + "指定菜品半价(";
    for (let j = 0;j<ITEM.length;j++){
      if(j == ITEM.length-1)
        str += ITEM[j];
      else
        str += ITEM[j] + "，";
    }
    str+= ")，省" + price[price.length - 1] + "元\n" + "-----------------------------------\n" + "总计：" + price[price.length - 2] + "元\n" + "===================================";
  }
  else if(price == discountPriceOne){
    for(let i = 0;i<price.length-2;i++){
      str += price[i].name + " x " + price[i].count + " = " + noDisconutPrice[i].sum + "元\n";
    }
    str += "-----------------------------------\n" + "使用优惠:\n" + "满30减6元，省" + price[price.length - 1] + "元\n" + "-----------------------------------\n" + "总计：" + price[price.length - 2] + "元\n" + "===================================";
  }
  else{
    for(let i = 0;i<price.length -2;i++){
      str += price[i].name + " x " + price[i].count + " = " + noDisconutPrice[i].sum + "元\n";
    }
    str+="-----------------------------------\n"+ "总计：" + price[price.length - 2] + "元\n" + "===================================";
  }
  return str;
}

function AllItemsMessage(inputs) {
  let allItems = loadAllItems();
  let item = [];
  for (let i = 0; i < inputs.length; i++) {
    let array = inputs[i].split(" x ");
    for (let j = 0; j < allItems.length; j++) {
      if (array[0] == allItems[j].id) {
        item.push(allItems[j]);
      }
    }
  item[i].count = parseInt(array[1]);
  item[i].sum = 0;
}
  return item;

  console.log(item);
}

function sumEachPrice(item) {
  let sumTotlePrice = 0,sumSavePrice = 0;
  for(let i = 0;i<item.length;i++){
    item[i].sum = item[i].price * item[i].count;
    sumTotlePrice = sumTotlePrice +item[i].sum;
  }
  item.push(sumTotlePrice);
  item.push(sumSavePrice);
  return item;
}

function sumDiscountOne(items) {
  if(items[items.length-2]>30){
    items[items.length-2] -=6;
    items[items.length-1] = 6;
  }
  return items;
}

function  sumDiscountTwo(item) {
  let discountPrice = loadPromotions();
  item[item.length -2] = 0;
  for(let i = 0;i<item.length -2;i++) {
    for (let j = 0; j < discountPrice[1].items.length; j++) {
      if (item[i].id == discountPrice[1].items[j]) {
        ITEM.push(item[i].name);
        item[i].sum /= 2;
        item[item.length - 1] += item[i].sum;
      }
    }
    item[item.length - 2] += item[i].sum;
  }
    return item;
}

function lastPrice(price,discountPriceOne,discountPriceTwo){
  let bestSave = price;
  if(discountPriceOne[discountPriceOne.length-2]<bestSave[bestSave.length-2]){
    bestSave = discountPriceOne;
  }
  if(discountPriceTwo[discountPriceTwo.length -2]<bestSave[bestSave.length-2]){
    bestSave = discountPriceTwo;
  }
  return bestSave;
}
