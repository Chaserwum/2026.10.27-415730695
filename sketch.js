let idleFrames = []; // 儲存角色站立動畫的圖片影格
let walkFrames = []; // 儲存角色行走動畫的圖片影格
let backWalkFrames = []; // 儲存角色後退動畫的圖片影格
let turnFrames = []; // 儲存角色轉向動畫的圖片影格
let jumpFrames = []; // 儲存角色原地跳躍動畫的圖片影格
let directionJumpFrames = []; // 儲存角色方向跳躍動畫的圖片影格
let landFrames = []; // 儲存角色落地動畫的圖片影格
let hadoukenFrames = []; // 儲存角色發射氣功的動畫圖片影格
let projectileFrames = []; // 儲存氣功彈飛行動畫的圖片影格
let shoryukenFrames = []; // 儲存升龍拳動畫的圖片影格
let senfukyakuFrames = []; // 儲存旋風腿動畫的圖片影格
let lightPunchFrames = []; // 儲存輕拳動畫的圖片影格
let projectiles = []; // 儲存畫面上正在飛行的氣功彈
let playerX = 0; // 記錄角色在畫布中的水平位置
let playerY = 0; // 記錄角色在畫布中的垂直位置
let floorY = 0; // 記錄地板在畫布中的垂直位置
let groundPlayerY = 0; // 記錄角色站在地板上時的中心位置
let animationFrame = 0; // 記錄目前播放的動畫影格
let animationTimer = 0; // 累計切換動畫影格的時間
let isWalking = false; // 記錄角色目前是否正在移動
let isJumping = false; // 記錄角色目前是否正在播放跳躍動畫
let isDirectionalJump = false; // 記錄目前是否播放方向跳躍動畫
let isLanding = false; // 記錄角色目前是否正在播放落地動畫
let isAttacking = false; // 記錄角色目前是否正在播放氣功招式
let isShoryuken = false; // 記錄角色目前是否正在播放升龍拳
let isSenfukyaku = false; // 記錄角色目前是否正在播放旋風腿
let isLightPunch = false; // 記錄角色目前是否正在播放輕拳
let wasJumpKeyDown = false; // 記錄上一畫格是否按住 W 鍵
let wasPunchKeyDown = false; // 記錄上一畫格是否按住 U 鍵
let wasSenfukyakuKeyDown = false; // 記錄上一畫格是否按住 J 鍵
let hadoukenCommandStage = 0; // 記錄氣功指令目前完成的輸入階段
let hadoukenCommandTimer = 0; // 累計氣功指令輸入經過的時間
let shoryukenCommandStage = 0; // 記錄升龍拳指令目前完成的輸入階段
let shoryukenCommandTimer = 0; // 累計升龍拳指令輸入經過的時間
let senfukyakuCommandStage = 0; // 記錄旋風腿指令目前完成的輸入階段
let senfukyakuCommandTimer = 0; // 累計旋風腿指令輸入經過的時間
let senfukyakuCommandDirection = -1; // 記錄輸入旋風腿指令開始時角色的面向
let attackDirection = -1; // 記錄本次氣功招式的發射方向
let senfukyakuStartX = 0; // 記錄旋風腿開始時角色的水平位置
let facingDirection = -1; // 記錄角色目前面向的水平方向
let isTurning = false; // 記錄角色目前是否正在播放轉向動畫
let turnFrame = 0; // 記錄目前播放的轉向動畫影格
let shoryukenStartY = 0; // 記錄升龍拳起跳時角色的垂直位置
const playerSpeed = 320; // 設定角色每秒移動的像素數
const frameDuration = 120; // 設定每張動畫影格播放的毫秒數
const spriteScale = 3.5; // 設定像素角色的放大倍率
const shoryukenHeight = 100 * spriteScale; // 設定升龍拳向上移動的高度
const senfukyakuDistance = 300; // 設定旋風腿向前移動的距離

function preload() { // 在程式啟動前載入角色圖片
  idleFrames = [ // 指定站立動畫依序播放的圖片
    loadImage("Ryu Animation/StandStill/0.png"), // 載入站立動畫第 1 張圖片
    loadImage("Ryu Animation/StandStill/1.png"), // 載入站立動畫第 2 張圖片
    loadImage("Ryu Animation/StandStill/2.png") // 載入站立動畫第 3 張圖片
  ]; // 完成站立動畫圖片清單
  walkFrames = [ // 指定行走動畫依序播放的圖片
    loadImage("Ryu Animation/Frontwalk/0.png"), // 載入行走動畫第 1 張圖片
    loadImage("Ryu Animation/Frontwalk/1.png"), // 載入行走動畫第 2 張圖片
    loadImage("Ryu Animation/Frontwalk/2.png"), // 載入行走動畫第 3 張圖片
    loadImage("Ryu Animation/Frontwalk/3.png"), // 載入行走動畫第 4 張圖片
    loadImage("Ryu Animation/Frontwalk/4.png") // 載入行走動畫第 5 張圖片
  ]; // 完成行走動畫圖片清單
  backWalkFrames = [ // 指定後退動畫依序播放的圖片
    loadImage("Ryu Animation/Backwalk/0.png"), // 載入後退動畫第 1 張圖片
    loadImage("Ryu Animation/Backwalk/1.png"), // 載入後退動畫第 2 張圖片
    loadImage("Ryu Animation/Backwalk/2.png"), // 載入後退動畫第 3 張圖片
    loadImage("Ryu Animation/Backwalk/3.png"), // 載入後退動畫第 4 張圖片
    loadImage("Ryu Animation/Backwalk/4.png"), // 載入後退動畫第 5 張圖片
    loadImage("Ryu Animation/Backwalk/5.png") // 載入後退動畫第 6 張圖片
  ]; // 完成後退動畫圖片清單
  turnFrames = [ // 指定轉向動畫依序播放的圖片
    loadImage("Ryu Animation/Turn/0.png"), // 載入轉向動畫第 1 張圖片
    loadImage("Ryu Animation/Turn/1.png"), // 載入轉向動畫第 2 張圖片
    loadImage("Ryu Animation/Turn/2.png") // 載入轉向動畫第 3 張圖片
  ]; // 完成轉向動畫圖片清單
  jumpFrames = [ // 指定一般跳躍動畫依序播放的圖片
    loadImage("Ryu Animation/Jump/0.png"), // 載入跳躍動畫第 1 張圖片
    loadImage("Ryu Animation/Jump/1.png"), // 載入跳躍動畫第 2 張圖片
    loadImage("Ryu Animation/Jump/2.png"), // 載入跳躍動畫第 3 張圖片
    loadImage("Ryu Animation/Jump/3.png"), // 載入跳躍動畫第 4 張圖片
    loadImage("Ryu Animation/Jump/4.png"), // 載入跳躍動畫第 5 張圖片
    loadImage("Ryu Animation/Jump/5.png") // 載入跳躍動畫第 6 張圖片
  ]; // 完成跳躍動畫圖片清單
  directionJumpFrames = [ // 指定方向跳躍動畫依序播放的圖片
    loadImage("Ryu Animation/Directionjump/0.png"), // 載入方向跳躍動畫第 1 張圖片
    loadImage("Ryu Animation/Directionjump/1.png"), // 載入方向跳躍動畫第 2 張圖片
    loadImage("Ryu Animation/Directionjump/2.png"), // 載入方向跳躍動畫第 3 張圖片
    loadImage("Ryu Animation/Directionjump/3.png"), // 載入方向跳躍動畫第 4 張圖片
    loadImage("Ryu Animation/Directionjump/4.png") // 載入方向跳躍動畫第 5 張圖片
  ]; // 完成方向跳躍動畫圖片清單
  landFrames = [ // 指定落地動畫依序播放的圖片
    loadImage("Ryu Animation/land/land.png") // 載入落地動畫圖片
  ]; // 完成落地動畫圖片清單
  hadoukenFrames = [ // 指定氣功招式動畫依序播放的圖片
    loadImage("Ryu Animation/hadouken/0.png"), // 載入氣功動畫第 1 張圖片
    loadImage("Ryu Animation/hadouken/1.png"), // 載入氣功動畫第 2 張圖片
    loadImage("Ryu Animation/hadouken/2.png"), // 載入氣功動畫第 3 張圖片
    loadImage("Ryu Animation/hadouken/3.png") // 載入氣功動畫第 4 張圖片
  ]; // 完成氣功招式動畫圖片清單
  projectileFrames = [ // 指定氣功彈飛行動畫依序播放的圖片
    loadImage("Ryu Animation/hadou/0.png"), // 載入氣功彈第 1 張圖片
    loadImage("Ryu Animation/hadou/1.png"), // 載入氣功彈第 2 張圖片
    loadImage("Ryu Animation/hadou/2.png"), // 載入氣功彈第 3 張圖片
    loadImage("Ryu Animation/hadou/3.png"), // 載入氣功彈第 4 張圖片
    loadImage("Ryu Animation/hadou/4.png") // 載入氣功彈第 5 張圖片
  ]; // 完成氣功彈飛行動畫圖片清單
  shoryukenFrames = [ // 指定升龍拳動畫依序播放的圖片
    loadImage("Ryu Animation/shoryuken/0.png"), // 載入升龍拳動畫第 1 張圖片
    loadImage("Ryu Animation/shoryuken/1.png"), // 載入升龍拳動畫第 2 張圖片
    loadImage("Ryu Animation/shoryuken/2.png"), // 載入升龍拳動畫第 3 張圖片
    loadImage("Ryu Animation/shoryuken/3.png"), // 載入升龍拳動畫第 4 張圖片
    loadImage("Ryu Animation/shoryuken/4.png"), // 載入升龍拳動畫第 5 張圖片
    loadImage("Ryu Animation/shoryuken/5.png") // 載入升龍拳動畫第 6 張圖片
  ]; // 完成升龍拳動畫圖片清單
  senfukyakuFrames = [ // 指定旋風腿動畫依序播放的圖片
    loadImage("Ryu Animation/Senfukyaku/0.png"), // 載入旋風腿動畫第 1 張圖片
    loadImage("Ryu Animation/Senfukyaku/1.png"), // 載入旋風腿動畫第 2 張圖片
    loadImage("Ryu Animation/Senfukyaku/2.png"), // 載入旋風腿動畫第 3 張圖片
    loadImage("Ryu Animation/Senfukyaku/3.png"), // 載入旋風腿動畫第 4 張圖片
    loadImage("Ryu Animation/Senfukyaku/4.png"), // 載入旋風腿動畫第 5 張圖片
    loadImage("Ryu Animation/Senfukyaku/5.png"), // 載入旋風腿動畫第 6 張圖片
    loadImage("Ryu Animation/Senfukyaku/6.png"), // 載入旋風腿動畫第 7 張圖片
    loadImage("Ryu Animation/Senfukyaku/7.png"), // 載入旋風腿動畫第 8 張圖片
    loadImage("Ryu Animation/Senfukyaku/8.png"), // 載入旋風腿動畫第 9 張圖片
    loadImage("Ryu Animation/Senfukyaku/9.png"), // 載入旋風腿動畫第 10 張圖片
    loadImage("Ryu Animation/Senfukyaku/10.png"), // 載入旋風腿動畫第 11 張圖片
    loadImage("Ryu Animation/Senfukyaku/11.png") // 載入旋風腿動畫第 12 張圖片
  ]; // 完成旋風腿動畫圖片清單
  lightPunchFrames = [ // 指定輕拳動畫依序播放的圖片
    loadImage("Ryu Animation/l-punch/0.png"), // 載入輕拳動畫第 1 張圖片
    loadImage("Ryu Animation/l-punch/1.png") // 載入輕拳動畫第 2 張圖片
  ]; // 完成輕拳動畫圖片清單
} // 結束圖片載入設定

function setup() { // 設定畫布與角色初始狀態
  createCanvas(windowWidth, windowHeight); // 建立填滿瀏覽器視窗的畫布
  imageMode(CENTER); // 讓角色圖片以中心點作為繪製座標
  noSmooth(); // 保留像素圖片放大後的俐落邊緣
  document.body.style.overflow = "hidden"; // 避免全螢幕畫布出現捲動條
  removeBlueBackground(idleFrames); // 將站立影格的藍色底色轉為透明
  removeBlueBackground(walkFrames); // 將行走影格的藍色底色轉為透明
  removeBlueBackground(backWalkFrames); // 將後退影格的藍色底色轉為透明
  removeBlueBackground(turnFrames); // 將轉向影格的藍色底色轉為透明
  removeBlueBackground(jumpFrames); // 將跳躍影格的藍色底色轉為透明
  removeBlueBackground(directionJumpFrames); // 將方向跳躍影格的藍色底色轉為透明
  removeBlueBackground(landFrames); // 將落地影格的藍色底色轉為透明
  removeBlueBackground(hadoukenFrames); // 將氣功招式影格的藍色底色轉為透明
  removeBlueBackground(projectileFrames); // 將氣功彈影格的藍色底色轉為透明
  removeBlueBackground(shoryukenFrames); // 將升龍拳影格的藍色底色轉為透明
  removeBlueBackground(senfukyakuFrames); // 將旋風腿影格的藍色底色轉為透明
  removeBlueBackground(lightPunchFrames); // 將輕拳影格的藍色底色轉為透明
  playerX = width / 2; // 將角色放在畫面水平中央
  floorY = height * 0.82; // 將地板放在畫面下方
  groundPlayerY = floorY - idleFrames[0].height * spriteScale / 2; // 計算角色站在地板上的中心位置
  playerY = groundPlayerY; // 將角色放在地板上方
} // 結束畫布初始化

function draw() { // 每個畫格更新角色並繪製畫面
  background("#bb9457"); // 使用指定的顏色作為背景
  noStroke(); // 移除地板填色區域的外框
  fill("#6f4f28"); // 設定地板顏色
  rect(0, floorY, width, height - floorY); // 繪製地板區域
  stroke("#4f3921"); // 設定地板邊緣顏色
  strokeWeight(5); // 設定地板邊緣粗細
  line(0, floorY, width, floorY); // 繪製地板上緣
  noStroke(); // 還原無外框設定
  let direction = 0; // 預設本畫格角色沒有水平移動
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // 檢查是否按下左方向鍵或 A 鍵
    direction -= 1; // 設定角色向左移動
  } // 結束左移輸入判斷
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // 檢查是否按下右方向鍵或 D 鍵
    direction += 1; // 設定角色向右移動
  } // 結束右移輸入判斷
  let verticalDirection = 0; // 預設本畫格角色沒有垂直移動
  if (keyIsDown(UP_ARROW)) { // 檢查是否按下上方向鍵
    verticalDirection -= 1; // 設定角色向上移動
  } // 結束上移輸入判斷
  if (keyIsDown(DOWN_ARROW)) { // 檢查是否按下下方向鍵
    verticalDirection += 1; // 設定角色向下移動
  } // 結束下移輸入判斷
  const jumpKeyDown = keyIsDown(87); // 檢查是否按住 W 鍵
  const directionKeyDown = direction !== 0 || verticalDirection !== 0; // 檢查是否同時按下方向鍵
  const downKeyDown = keyIsDown(83); // 檢查氣功指令的下方向輸入
  const forwardKeyDown = keyIsDown(facingDirection > 0 ? 68 : 65); // 依角色面向判斷前方向鍵
  const backKeyDown = keyIsDown((senfukyakuCommandStage > 0 ? senfukyakuCommandDirection : facingDirection) > 0 ? 65 : 68); // 依指令開始時的面向判斷旋風腿後方向鍵
  const punchKeyDown = keyIsDown(85); // 檢查是否按下 U 鍵
  const senfukyakuKeyDown = keyIsDown(74); // 檢查是否按下 J 鍵
  let specialMoveStarted = false; // 記錄本畫格是否由招式指令觸發特殊招式
  if (senfukyakuCommandStage > 0) { // 正在輸入旋風腿指令時累計時間
    senfukyakuCommandTimer += deltaTime; // 累計指令各階段之間經過的時間
    if (senfukyakuCommandTimer > 800) { // 指令輸入超過時限時取消未完成指令
      senfukyakuCommandStage = 0; // 重設旋風腿指令階段
      senfukyakuCommandTimer = 0; // 重設旋風腿指令計時
    } // 結束旋風腿指令逾時判斷
  } // 結束旋風腿指令計時
  if (senfukyakuCommandStage === 0 && downKeyDown && !backKeyDown) { // 按下 S 開始旋風腿指令
    senfukyakuCommandStage = 1; // 記錄已輸入下方向
    senfukyakuCommandTimer = 0; // 開始旋風腿指令計時
    senfukyakuCommandDirection = facingDirection; // 鎖定指令開始時角色的面向
  } else if (senfukyakuCommandStage === 1 && downKeyDown && backKeyDown) { // 輸入下後方向完成第二階段
    senfukyakuCommandStage = 2; // 記錄已輸入下後方向
  } else if (senfukyakuCommandStage === 2 && !downKeyDown && backKeyDown) { // 放開 S 並保持後方向完成指令
    senfukyakuCommandStage = 3; // 記錄方向指令已完成
  } // 結束旋風腿方向指令判斷
  if (shoryukenCommandStage > 0) { // 正在輸入升龍拳指令時累計時間
    shoryukenCommandTimer += deltaTime; // 累計指令各階段之間經過的時間
    if (shoryukenCommandTimer > 800) { // 指令輸入超過時限時取消未完成指令
      shoryukenCommandStage = 0; // 重設升龍拳指令階段
      shoryukenCommandTimer = 0; // 重設升龍拳指令計時
    } // 結束升龍拳指令逾時判斷
  } // 結束升龍拳指令計時
  if (shoryukenCommandStage === 0 && forwardKeyDown && !downKeyDown) { // 按下前方向開始升龍拳指令
    shoryukenCommandStage = 1; // 記錄已輸入前方向
    shoryukenCommandTimer = 0; // 開始升龍拳指令計時
  } else if (shoryukenCommandStage === 1 && downKeyDown && !forwardKeyDown) { // 接著只按下方向
    shoryukenCommandStage = 2; // 記錄已輸入下方向
  } else if (shoryukenCommandStage === 2 && downKeyDown && forwardKeyDown) { // 最後輸入下前方向
    shoryukenCommandStage = 3; // 記錄方向指令已完成
  } // 結束升龍拳方向指令判斷
  if (shoryukenCommandStage === 3 && downKeyDown && forwardKeyDown && punchKeyDown && !wasPunchKeyDown && !isJumping && !isLanding && !isAttacking && !isShoryuken && !isSenfukyaku && !isLightPunch) { // 完成前、下、下前後按 U 發動升龍拳
    isShoryuken = true; // 開始播放升龍拳動畫
    specialMoveStarted = true; // 標記本畫格已觸發特殊招式
    shoryukenStartY = playerY; // 記錄升龍拳起始高度
    attackDirection = facingDirection; // 鎖定升龍拳的面向
    isTurning = false; // 招式期間不播放轉向動畫
    animationFrame = 0; // 從升龍拳動畫第一張影格開始播放
    animationTimer = 0; // 重設影格計時以完整播放招式動畫
    shoryukenCommandStage = 0; // 清除已完成的升龍拳指令
    shoryukenCommandTimer = 0; // 重設升龍拳指令計時
    hadoukenCommandStage = 0; // 避免同一組方向輸入同時觸發氣功
    hadoukenCommandTimer = 0; // 重設氣功指令計時
  } // 結束升龍拳招式觸發判斷
  if (hadoukenCommandStage > 0) { // 正在輸入氣功指令時累計時間
    hadoukenCommandTimer += deltaTime; // 累計指令各階段之間經過的時間
    if (hadoukenCommandTimer > 800) { // 指令輸入超過時限時取消未完成指令
      hadoukenCommandStage = 0; // 重設指令階段
      hadoukenCommandTimer = 0; // 重設指令計時
    } // 結束指令逾時判斷
  } // 結束指令計時
  if (downKeyDown && hadoukenCommandStage === 0) { // S 開始指令的第一階段
    hadoukenCommandStage = 1; // 記錄已輸入下方向
    hadoukenCommandTimer = 0; // 開始指令計時
  } else if (hadoukenCommandStage === 1 && downKeyDown && forwardKeyDown) { // 依角色面向按住前方向加 S 輸入斜前
    hadoukenCommandStage = 2; // 記錄已輸入下前方向
  } else if (hadoukenCommandStage === 2 && !downKeyDown && forwardKeyDown) { // 放開 S 並保持前方向完成指令
    hadoukenCommandStage = 3; // 記錄已輸入前方向
  } else if ((hadoukenCommandStage === 1 && !downKeyDown) || ((hadoukenCommandStage === 2 || hadoukenCommandStage === 3) && !forwardKeyDown)) { // 輸入方向中斷時取消指令
    hadoukenCommandStage = 0; // 重設指令階段
    hadoukenCommandTimer = 0; // 重設指令計時
  } // 結束氣功方向指令判斷
  if (hadoukenCommandStage === 3 && forwardKeyDown && punchKeyDown && !wasPunchKeyDown && !isJumping && !isLanding && !isAttacking && !isShoryuken && !isSenfukyaku && !isLightPunch) { // 完成下、斜前、前後按 U 發動氣功
    isAttacking = true; // 開始播放氣功招式動畫
    specialMoveStarted = true; // 標記本畫格已觸發特殊招式
    attackDirection = facingDirection; // 鎖定本次招式與氣功彈的發射方向
    isTurning = false; // 招式期間不播放轉向動畫
    animationFrame = 0; // 從招式動畫第一張影格開始播放
    animationTimer = 0; // 重設影格計時以完整播放招式動畫
    hadoukenCommandStage = 0; // 清除已完成的指令
    hadoukenCommandTimer = 0; // 重設指令計時
  } // 結束氣功招式觸發判斷
  if (senfukyakuCommandStage === 3 && backKeyDown && senfukyakuKeyDown && !wasSenfukyakuKeyDown && !isJumping && !isLanding && !isAttacking && !isShoryuken && !isSenfukyaku && !isLightPunch) { // 完成下、斜後、後後按 J 發動旋風腿
    isSenfukyaku = true; // 開始播放旋風腿動畫
    specialMoveStarted = true; // 標記本畫格已觸發特殊招式
    attackDirection = senfukyakuCommandDirection; // 依指令開始時的面向鎖定旋風腿前進方向
    facingDirection = attackDirection; // 讓旋風腿動畫保持朝向指令開始時的面向
    senfukyakuStartX = playerX; // 記錄旋風腿開始時的位置
    isTurning = false; // 招式期間不播放轉向動畫
    animationFrame = 0; // 從旋風腿動畫第一張影格開始播放
    animationTimer = 0; // 重設影格計時以完整播放招式動畫
    senfukyakuCommandStage = 0; // 清除已完成的指令
    senfukyakuCommandTimer = 0; // 重設旋風腿指令計時
    hadoukenCommandStage = 0; // 清除與旋風腿方向重疊的氣功指令
    hadoukenCommandTimer = 0; // 重設氣功指令計時
    shoryukenCommandStage = 0; // 清除與旋風腿方向重疊的升龍拳指令
    shoryukenCommandTimer = 0; // 重設升龍拳指令計時
  } // 結束旋風腿招式觸發判斷
  if (punchKeyDown && !wasPunchKeyDown && !specialMoveStarted && !directionKeyDown && !downKeyDown && hadoukenCommandStage === 0 && shoryukenCommandStage === 0 && senfukyakuCommandStage === 0 && !isJumping && !isLanding && !isAttacking && !isShoryuken && !isSenfukyaku && !isLightPunch) { // 單獨按下 U 時播放輕拳
    isLightPunch = true; // 開始播放輕拳動畫
    isTurning = false; // 輕拳期間不播放轉向動畫
    animationFrame = 0; // 從輕拳動畫第一張影格開始播放
    animationTimer = 0; // 重設影格計時以完整播放輕拳動畫
  } // 結束輕拳輸入判斷
  wasPunchKeyDown = punchKeyDown; // 記錄 U 鍵狀態以避免按住時重複觸發
  wasSenfukyakuKeyDown = senfukyakuKeyDown; // 記錄 J 鍵狀態以避免按住時重複觸發
  if (jumpKeyDown && !wasJumpKeyDown && !isJumping && !isLanding && !isAttacking && !isShoryuken && !isSenfukyaku && !isLightPunch) { // 按下 W 時開始播放一次跳躍動畫
    isJumping = true; // 開始跳躍動畫
    isDirectionalJump = directionKeyDown; // 依是否同時按下方向鍵選擇跳躍種類
    isTurning = false; // 跳躍期間不播放轉向動畫
    animationFrame = 0; // 從跳躍動畫第一張影格開始播放
    animationTimer = 0; // 重設影格計時以完整播放跳躍動畫
  } else if (jumpKeyDown && directionKeyDown && isJumping && !isDirectionalJump) { // W 持續按住時再按方向鍵則切換為方向跳躍
    isDirectionalJump = true; // 切換至方向跳躍動畫
    animationFrame = 0; // 從方向跳躍動畫第一張影格開始播放
    animationTimer = 0; // 重設影格計時以完整播放方向跳躍動畫
  } // 結束跳躍輸入判斷
  wasJumpKeyDown = jumpKeyDown; // 記錄 W 鍵狀態以避免按住時重複觸發跳躍
  isWalking = direction !== 0; // 根據移動方向切換待機或行走動畫
  if (!isAttacking && !isShoryuken && !isSenfukyaku && !isLightPunch && isWalking && direction !== facingDirection) { // 非招式期間檢查角色是否需要改變面向
    facingDirection = direction; // 記錄角色新的面向
    if (!isJumping) { // 跳躍時直接改變面向，不插入轉向動畫
      isTurning = true; // 開始播放轉向動畫
      turnFrame = 0; // 從轉向動畫第一張影格開始播放
      animationFrame = 0; // 轉向完成後從行走動畫第一張影格開始播放
      animationTimer = 0; // 重設影格計時，確保轉向動畫完整播放
    } // 結束跳躍期間轉向判斷
  } // 結束角色轉向判斷
  if (!isAttacking && !isShoryuken && !isSenfukyaku && !isLightPunch && isWalking) { // 招式期間保持位置，其他時間依輸入移動
    playerX += direction * playerSpeed * (deltaTime / 1000); // 依經過時間平順更新角色水平位置
  } // 結束角色移動更新
  const wasAboveFloor = playerY < groundPlayerY; // 記錄移動前角色是否離開地板
  if (!isAttacking && !isShoryuken && !isSenfukyaku && !isLightPunch && verticalDirection !== 0) { // 招式期間保持位置，其他時間依上下輸入移動
    playerY += verticalDirection * playerSpeed * (deltaTime / 1000); // 依經過時間平順更新角色垂直位置
  } // 結束角色垂直移動更新
  playerX = constrain(playerX, 28 * spriteScale, width - 28 * spriteScale); // 將角色限制在畫布左右邊界內
  playerY = constrain(playerY, shoryukenFrames[0].height * spriteScale / 2, groundPlayerY); // 將角色限制在畫面上緣與地板之間
  if (wasAboveFloor && playerY >= groundPlayerY && verticalDirection > 0 && !isJumping && !isLanding && !isShoryuken) { // 角色下移接觸地板時播放落地動畫
    isLanding = true; // 開始播放落地動畫
    animationFrame = 0; // 從落地動畫第一張影格開始播放
    animationTimer = 0; // 重設落地動畫計時
  } // 結束垂直移動落地判斷
  animationTimer += deltaTime; // 累計經過時間以控制動畫播放速度
  while (animationTimer >= frameDuration) { // 時間足夠時切換到下一張動畫圖片
    animationTimer -= frameDuration; // 扣除一張影格所需的播放時間
    if (isTurning) { // 正在轉向時依序播放轉向影格
      turnFrame += 1; // 前進到下一張轉向影格
      if (turnFrame >= turnFrames.length) { // 檢查轉向動畫是否已播放完畢
        isTurning = false; // 結束轉向並切換至行走或站立動畫
        turnFrame = 0; // 重設轉向影格供下次播放
      } // 結束轉向動畫完成判斷
    } else if (isJumping) { // 跳躍期間依序播放跳躍影格
      animationFrame += 1; // 前進到下一張跳躍影格
      const jumpAnimationFrames = isDirectionalJump ? directionJumpFrames : jumpFrames; // 依跳躍種類選擇影格
      if (animationFrame >= jumpAnimationFrames.length) { // 檢查跳躍動畫是否已播放完畢
        isJumping = false; // 結束跳躍並回到一般動作
        isDirectionalJump = false; // 重設跳躍種類供下次播放
        isLanding = true; // 開始播放落地動畫
        animationFrame = 0; // 重設一般動作影格
        animationTimer = 0; // 重設計時避免跳躍時間累積至下一動作
        break; // 本次更新結束，避免跳躍結束時跳過一般動作影格
      } // 結束跳躍動畫完成判斷
    } else if (isLanding) { // 落地時播放落地影格
      animationFrame += 1; // 前進至落地動畫結束位置
      if (animationFrame >= landFrames.length) { // 檢查落地動畫是否已播放完畢
        isLanding = false; // 結束落地動畫並切回一般動作
        animationFrame = 0; // 重設一般動作影格
      } // 結束落地動畫完成判斷
    } else if (isShoryuken) { // 升龍拳期間依序播放招式影格
      animationFrame += 1; // 前進到下一張升龍拳影格
      if (animationFrame >= shoryukenFrames.length) { // 檢查升龍拳動畫是否已播放完畢
        isShoryuken = false; // 結束升龍拳動作
        playerY = shoryukenStartY; // 讓角色落回起跳時的地板位置
        isLanding = true; // 播放落地動畫
        animationFrame = 0; // 從落地動畫第一張影格開始播放
        animationTimer = 0; // 重設落地動畫計時
        break; // 本次更新結束，避免跳過落地影格
      } // 結束升龍拳動畫完成判斷
    } else if (isSenfukyaku) { // 旋風腿期間依序播放招式影格
      animationFrame += 1; // 前進到下一張旋風腿影格
      if (animationFrame >= senfukyakuFrames.length) { // 檢查旋風腿動畫是否已播放完畢
        isSenfukyaku = false; // 結束旋風腿動作
        playerX = constrain(senfukyakuStartX + attackDirection * senfukyakuDistance, 28 * spriteScale, width - 28 * spriteScale); // 將角色停在向前移動的終點
        animationFrame = 0; // 重設一般動作影格
      } // 結束旋風腿動畫完成判斷
    } else if (isLightPunch) { // 輕拳期間依序播放拳擊影格
      animationFrame += 1; // 前進到下一張輕拳影格
      if (animationFrame >= lightPunchFrames.length) { // 檢查輕拳動畫是否已播放完畢
        isLightPunch = false; // 結束輕拳動作
        animationFrame = 0; // 重設一般動作影格
      } // 結束輕拳動畫完成判斷
    } else if (isAttacking) { // 氣功招式期間依序播放招式影格
      animationFrame += 1; // 前進到下一張招式影格
      if (animationFrame >= hadoukenFrames.length) { // 檢查招式動畫是否已播放完畢
        isAttacking = false; // 結束招式動畫
        animationFrame = 0; // 重設一般動作影格
        projectiles.push({ // 建立一顆朝角色面向前進的氣功彈
          x: playerX + attackDirection * 70 * spriteScale, // 將氣功彈放在角色前方
          y: playerY - 12 * spriteScale, // 將氣功彈對準角色上半身
          direction: attackDirection, // 記錄氣功彈發射方向
          frame: 0, // 從氣功彈第一張影格開始播放
          timer: 0 // 重設氣功彈動畫計時
        }); // 完成氣功彈建立
      } // 結束招式動畫完成判斷
    } else { // 非轉向期間播放目前動作的動畫
      animationFrame += 1; // 前進到下一張動畫影格
    } // 結束動畫類型判斷
  } // 結束動畫影格時間更新
  if (isShoryuken) { // 升龍拳期間依動畫進度移動角色
    const shoryukenProgress = constrain((animationFrame + animationTimer / frameDuration) / shoryukenFrames.length, 0, 1); // 計算升龍拳動畫進度
    const availableLift = shoryukenStartY - shoryukenFrames[0].height * spriteScale / 2 - 8 * spriteScale; // 計算不超出畫面的最大上升高度
    const shoryukenLift = Math.max(0, Math.min(shoryukenHeight, availableLift)); // 依畫面空間限制升龍拳高度
    playerY = shoryukenStartY - Math.sin(shoryukenProgress * Math.PI) * shoryukenLift; // 讓角色上升後再落回地板
  } // 結束升龍拳垂直移動
  if (isSenfukyaku) { // 旋風腿期間依動畫進度向前移動
    const senfukyakuProgress = constrain((animationFrame + animationTimer / frameDuration) / senfukyakuFrames.length, 0, 1); // 計算旋風腿動畫進度
    playerX = constrain(senfukyakuStartX + attackDirection * senfukyakuDistance * senfukyakuProgress, 28 * spriteScale, width - 28 * spriteScale); // 讓角色向前移動較長距離
  } // 結束旋風腿水平移動
  for (const projectile of projectiles) { // 更新畫面上所有氣功彈
    projectile.x += projectile.direction * 520 * (deltaTime / 1000); // 讓氣功彈持續朝發射方向前進
    projectile.timer += deltaTime; // 累計氣功彈動畫時間
    while (projectile.timer >= frameDuration) { // 到達影格時間時切換氣功彈圖片
      projectile.timer -= frameDuration; // 扣除一張影格所需的播放時間
      projectile.frame = (projectile.frame + 1) % projectileFrames.length; // 循環播放氣功彈影格
    } // 結束氣功彈動畫更新
  } // 結束所有氣功彈更新
  projectiles = projectiles.filter((projectile) => projectile.x > -100 && projectile.x < width + 100); // 移除飛出畫布範圍的氣功彈
  for (const projectile of projectiles) { // 繪製所有正在飛行的氣功彈
    push(); // 暫存畫布狀態以設定氣功彈方向
    translate(projectile.x, projectile.y); // 將繪圖原點移至氣功彈位置
    scale(projectile.direction > 0 ? -1 : 1, 1); // 讓氣功彈貼圖朝向與原本相反
    const projectileImage = projectileFrames[projectile.frame]; // 取得氣功彈目前的動畫影格
    image(projectileImage, 0, 0, projectileImage.width * spriteScale, projectileImage.height * spriteScale); // 放大並繪製氣功彈
    pop(); // 還原畫布狀態
  } // 結束氣功彈繪製
  const activeFrames = direction > 0 ? walkFrames : direction < 0 ? backWalkFrames : idleFrames; // 依移動方向選擇前進、後退或站立動畫
  const jumpAnimationFrames = isDirectionalJump ? directionJumpFrames : jumpFrames; // 依跳躍種類選擇影格
  const jumpProgress = isJumping ? constrain((animationFrame + animationTimer / frameDuration) / jumpAnimationFrames.length, 0, 1) : 0; // 計算跳躍動畫目前進度
  const jumpOffset = Math.sin(jumpProgress * Math.PI) * 90 * spriteScale; // 依跳躍進度計算離地高度
  const currentImage = isSenfukyaku ? senfukyakuFrames[animationFrame] : isLightPunch ? lightPunchFrames[animationFrame] : isShoryuken ? shoryukenFrames[animationFrame] : isAttacking ? hadoukenFrames[animationFrame] : isLanding ? landFrames[0] : isJumping ? jumpAnimationFrames[animationFrame] : isTurning ? turnFrames[turnFrame] : activeFrames[animationFrame % activeFrames.length]; // 依目前動作取得要顯示的圖片
  push(); // 暫存畫布狀態以設定角色朝向
  translate(playerX, playerY - jumpOffset); // 將繪圖原點移至角色所在位置並套用跳躍高度
  scale(facingDirection > 0 ? -1 : 1, 1); // 依角色目前面向翻轉圖片
  image(currentImage, 0, 0, currentImage.width * spriteScale, currentImage.height * spriteScale); // 放大並繪製目前的角色影格
  pop(); // 還原畫布狀態以免影響後續繪圖
} // 結束每畫格更新與繪製

function removeBlueBackground(frames) { // 將角色影格的藍色底色設為透明
  for (const frame of frames) { // 逐一處理動畫中的每張圖片
    frame.loadPixels(); // 讀取目前圖片的所有像素資料
    for (let pixelIndex = 0; pixelIndex < frame.pixels.length; pixelIndex += 4) { // 每次讀取一個 RGBA 像素
      if (frame.pixels[pixelIndex] === 85 && frame.pixels[pixelIndex + 1] === 170 && frame.pixels[pixelIndex + 2] === 255) { // 確認像素是否為素材藍色底色
        frame.pixels[pixelIndex + 3] = 0; // 將符合的底色像素設為完全透明
      } // 結束藍色底色判斷
    } // 結束目前圖片的像素處理
    frame.updatePixels(); // 套用像素透明度變更
  } // 結束所有圖片的底色處理
} // 結束藍色底色移除函式

function windowResized() { // 視窗尺寸改變時重新調整畫布
  resizeCanvas(windowWidth, windowHeight); // 讓畫布繼續填滿整個瀏覽器視窗
  floorY = height * 0.82; // 讓地板在視窗縮放後維持於畫面下方
  groundPlayerY = floorY - idleFrames[0].height * spriteScale / 2; // 重新計算角色站在地板上的位置
  playerY = groundPlayerY; // 視窗縮放後將角色放回地板
  playerX = constrain(playerX, 28 * spriteScale, width - 28 * spriteScale); // 避免角色在縮放後超出畫布範圍
} // 結束視窗縮放處理
