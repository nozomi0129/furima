window.addEventListener("DOMContentLoaded", () => {

  // 決済処理を許可するurlは</items/:id/orders>の場合です。
  const path = location.pathname
  const params = path.replace(/items/g, '').replace(/orders/g, '').replace(/\//g, '');

  if (path.includes("items") && path.includes("orders") && /^([1-9]\d*|0)$/.test(params)) {
    const PAYJP_PK = process.env.PAYJP_PUBLIC_KEY
　　　// payjpのミニアプリで環境変数を設定しているはずです。
　　　// vim ~/.zshrcで環境変数の命名を確認しましょう
　　　
    Payjp.setPublicKey(PAYJP_PK);
    const form = document.getElementById("charge-form");
    // フォームのidを取得

    form.addEventListener("submit", (e) => {
      e.preventDefault();
　　// 送信をされたら、一度通常の送信イベントをキャンセルして、jsの処理へ移ります。
　　　　
　　　　//呼び出されるので、一旦放置
      const sendWithoutCardInfo = () => {
        document.getElementById("card-number").removeAttribute("name");
                   // ↑消してね、属性値をと言っているので属性をかかないといけない
        document.getElementById("card-cvc").removeAttribute("name");
        document.getElementById("card-exp-month").removeAttribute("name");
        document.getElementById("card-exp-year").removeAttribute("name");
        document.getElementById("charge-form").submit();
        document.getElementById("charge-form").reset();
      }
　　　　// 呼び出されたら、入力されたカードのname属性を削除する。
　　　　// その後、送信を行い、通常の動きへ戻る


      const formResult = document.getElementById("charge-form");
      const formData = new FormData(formResult);
　　　//　フォームで入力された値をFormDataを使用して取得する

      // カード情報の構成や、トークン生成はこちらのリファレンスを参照
      // https://pay.jp/docs/payjs-v1
      const card = {
        number: formData.get("number"),
        cvc: formData.get("cvc"),
        exp_month: formData.get("exp_month"),
        exp_year: `20${formData.get("exp_year")}`,
      };
      console.log(card)
    
　　　// カード情報を取得

      Payjp.createToken(card, (status, response) => {
        if (status === 200) {
          // response.idでtokenが取得できます。
          const token = response.id;
          const renderDom = document.getElementById("charge-form");
          // サーバーにトークン情報を送信するために、inputタグをhidden状態で追加します。
          const tokenObj = `<input value=${token} type="hidden" name='token'>`;
          renderDom.insertAdjacentHTML("beforeend", tokenObj);
          sendWithoutCardInfo()
　　　　　　//　一旦スルーしたものをここで呼び出します。

        } else {
          window.alert('購入処理に失敗しました。\nお手数ですが最初からやり直してください。');
          sendWithoutCardInfo()
        }
      });
    });
  }
});