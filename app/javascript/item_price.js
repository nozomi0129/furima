//if (window.location.href.match(/\items\new/)){
window.addEventListener('DOMContentLoaded', () => {
//①まずJSを動かす記述（Ajaxappに書いてある↑
//   //arrowかfunctionか
//   'onload'ではなく'DOMContentLoaded'を使用しているのは画像があってもなくても関係ないから

  //②価格入力欄のidを手がかりに変数にconstで代入する
  const priceInput = document.getElementById('item-price'); //価格のid
  const taxEl = document.getElementById('add-tax-price'); //手数料のid
  const profitEl = document.getElementById('profit'); //販売利益のid
  //     //java イベント
  //     //インプット取得
  //     priceInput.addEventListener("input", () => {

  //③価格のフォームに入力したあとにイベントを発火
  priceInput.addEventListener("input", function() {
    //js テスト　書き換えで検索すると出てくる
    //価格のフォームに入力した値をとってきたい
    const price = this.value //thisでform要素を持ってきている
  
    //const price = document.getElementById(“item-price”).value;でも可能
    
    //④手数料、利益計算
    const tax = Math.floor(price * 0.1); //手数料
    const profit = Math.floor(price - tax);
    // const profit = Math.floor(price * 0.9); //利益

    //NumberFormat comFormat = NumberFormat.getNumberInstance(); //カンマ区切り
    
    //⑤手数料と利益を貼り付ける
    taxEl.textContent = tax;
    profitEl.textContent = profit;
    //HTMLを解釈せずにそのまま文字として出力する"のがtextContent <b>が打たれたらそのまま出る
  });
});

// ■より簡略的
// window.addEventListener('load', function(){
//   let price =  document.getElementById("item-price")
//   let tax =  document.getElementById("add-tax-price")
//   let profit =  document.getElementById("profit") 
//   price.addEventListener('input', function(){
//     let inputprice = document.getElementById("item-price").value
//       tax.innerHTML = Math.floor( inputprice / 10 )
//       profit.innerHTML = Math.floor( inputprice - tax.innerHTML )
//     })
// })

// window.addEventListener("DOMContentLoaded", () => {
//   const path = location.pathname
//   const pathRegex = /^(?=.*item)(?=.*edit)/
//   if (path === "/items/new" || path === "/items" || pathRegex.test(path)) {
//     //    出品ページの場合　||　出品ページの検証にかかった場合 || 商品編集の場合
//     const priceInput = document.getElementById("item_price"); //価格のid
//     const addTaxDom = document.getElementById("add-tax-price"); //手数料のid
//     const profitDom = document.getElementById("profit"); //販売利益のid
    
//     //java イベント
//     //インプット取得
//     priceInput.addEventListener("input", () => {

//       const inputRegex = /^([1-9]\d*|0)$/
//       const inputValue = document.getElementById("item_price").value;
//       if (inputRegex.test(inputValue)) {
      
//       //js テスト　書き換えで検索すると出てくる

//         addTaxDom.innerHTML = Math.floor(inputValue * 0.1).toLocaleString();
//         profitDom.innerHTML = Math.floor(inputValue * 0.9).toLocaleString();
//       } else {
//         addTaxDom.innerHTML = '半角数字のみ入力可能'
//         profitDom.innerHTML = '半角数字のみ入力可能'
//       }
//     })
//   }
// });
