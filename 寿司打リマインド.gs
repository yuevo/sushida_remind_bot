// WebhookURLを追加
let postUrl = "ここにWebhookURLを追加する";　
// botを投入したいチャンネル名を追加
let postChannel = "#ここにチャンネル名を追加する"; 

// 今月のシートを取得する
let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シフトシート');
// 今日の日付をDateオブジェクトで取得
let today = new Date();
let this_day = today.getDate();
// メンバー全員分のユーザIDを取得
let members = sheet.getSheetValues(25, 2, 4, 1);
// reminder用配列
let reminder = [];

function sushidaBot(){
  // メンバーの情報を取得
  let shift_lists = sheet.getSheetValues(3, 1 + this_day, 4, 1);
  // 今日出勤のメンバーを取得
  shift_lists.forEach( function(shift, i) {
    if (shift == "公" || shift == "有") {
      return false;
    } else {
      var member = members[i];
      reminder.push(member);
    };
  });
  // 各URLを取得
  let sushida_url = "http://typingx0.net/sushida/play.html"
  let etype_url = "https://www.e-typing.ne.jp/roma/check/"
  
  // 参加メンバーが存在すれば
  if (reminder != "") {
  sendHttpPost_('こんにちは！寿司打＆e-typingリマインダーbotです:sushi_scroll:\
                \n' + reminder +'\
                \n本日のシフトの方々です！\
                \n各自シフト前に下記のURLから実施し、それぞれの成績のスクショをスレッドに投稿お願いします！\
                \n皆さんそれぞれ目標に向かって頑張りましょう！！\
                \n寿司打：' + sushida_url +'\
                \ne-typing：' + etype_url +'','寿司打リマインダーbot',':oshushidayo:');
  // 参加メンバーが存在しなければ
  } else if (reminder == "") {
    return false
  }
};


// ポストするための記述
function sendHttpPost_(message, username, icon) {
  let jsonData = {
    "channel" : postChannel,
    "username" : username,
    "icon_emoji": icon,
    "text" : message
  };
  let payload = JSON.stringify(jsonData);
  let options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };
  UrlFetchApp.fetch(postUrl, options);
}
