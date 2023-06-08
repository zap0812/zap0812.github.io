// マインスイーパーのサイズと地雷の数
var rows = 10;
var cols = 10;
var mines = 10;

// マインスイーパーの配列を作成
var board = [];
for (var i = 0; i < rows; i++) {
  board[i] = [];
  for (var j = 0; j < cols; j++) {
    board[i][j] = { mine: false, count: 0, hidden: true, flag: false };
  }
}

// 地雷をランダムに配置
var placed = 0;
while (placed < mines) {
  var x = Math.floor(Math.random() * rows);
  var y = Math.floor(Math.random() * cols);
  if (!board[x][y].mine) {
    board[x][y].mine = true;
    placed++;
  }
}

// 周囲の地雷の数を計算
for (var i = 0; i < rows; i++) {
  for (var j = 0; j < cols; j++) {
    if (!board[i][j].mine) {
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          var x = i + dx;
          var y = j + dy;
          if (
            x >= 0 &&
            x < rows &&
            y >= 0 &&
            y < cols &&
            board[x][y].mine
          ) {
            board[i][j].count++;
          }
        }
      }
    }
  }
}

// テーブルを取得
var table = document.getElementById("table");

// テーブルにセルを追加
for (var i = 0; i < rows; i++) {
  var tr = document.createElement("tr");
  for (var j = 0; j < cols; j++) {
    var td = document.createElement("td");
    td.className = "hidden";
    td.id = i + "," + j;
    td.addEventListener("click", clickHandler);
    td.addEventListener("contextmenu", rightClickHandler);
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

// セルがクリックされたときの処理
function clickHandler(e) {
  e.preventDefault();
  var id = e.target.id.split(",");
  var x = parseInt(id[0]);
  var y = parseInt(id[1]);
  reveal(x, y);
  checkWin();
}

// セルが右クリックされたときの処理
function rightClickHandler(e) {
  e.preventDefault();
  var id = e.target.id.split(",");
  var x = parseInt(id[0]);
  var y = parseInt(id[1]);
  toggleFlag(x, y);
  checkWin();
}

// セルを開く関数
function reveal(x, y) {
  if (board[x][y].hidden && !board[x][y].flag) {
    board[x][y].hidden = false;
    var td = document.getElementById(x + "," + y);
    if (board[x][y].mine) {
      td.className = "mine";
      alert("ゲームオーバー");
      document.location.reload();
    } else {
      // 追加した色のクラス名
      var colors = ["", "one", "two", "three", "four", "five", "six", "seven", "eight"];
      td.innerHTML = board[x][y].count || "";
      td.className = colors[board[x][y].count]; // 色を適用する
      if (board[x][y].count == 0) {
        for (var dx = -1; dx <= 1; dx++) {
          for (var dy = -1; dy <= 1; dy++) {
            var i = x + dx;
            var j = y + dy;
            if (
              i >= 0 &&
              i < rows &&
              j >= 0 &&
              j < cols &&
              board[i][j].hidden
            ) {
              reveal(i, j);
            }
          }
        }
      }
    }
  }
}

// セルに旗を立てる関数
function toggleFlag(x, y) {
  if (board[x][y].hidden) {
    board[x][y].flag = !board[x][y].flag;
    var td = document.getElementById(x + "," + y);
    if (board[x][y].flag) {
      td.className = "flag";
    } else {
      td.className = "hidden";
    }
  }
}

// 勝利判定の関数
function checkWin() {
  var cleared = 0;
  var flagged = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (!board[i][j].hidden) {
        cleared++;
      }
      if (board[i][j].flag && board[i][j].mine) {
        flagged++;
      }
    }
  }
  if (cleared == rows * cols - mines || flagged == mines) {
    alert("おめでとう！あなたは勝ちました！");
    document.location.reload();
  }
}
