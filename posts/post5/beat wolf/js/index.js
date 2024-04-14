$(function () {
   //在这里输入具体的js代码
   // 监听游戏开始
   $(".start").click(function () {
      $(".start").stop().fadeOut(100);
      // 调用进度条方法
      progressHandle();
      // // 随机开启灰太狼或小灰灰动画
      // var wolfOrXiaoWolf = Math.random() > 0.5 ? "wolf" : "xiaoWolf";
      // console.log(wolfOrXiaoWolf);
      // // 开启灰太狼动画
      // startWolfAnimation();
      // // 开启小灰灰动画
      // startXiaoWolfAnimation();
      // 开启动画
      startWolfAnimation();
  });

  // 监听游戏规则
  $(".rules").click(function () {
      $(".rule").stop().fadeIn(100);
  });
  // 监听关闭游戏规则
  $(".close").click(function () {
      $(".rule").stop().fadeOut(100);
  });

  // 处理进度条方法
  function progressHandle() {
   // 重置进度条宽度
   $(".progress").css({width: 180});
   var timer;
   var cnt = 0; // 记录是否是首次到达50分
   clearInterval(timer);
   // 开启进度条定时器
   timer = setInterval(function () {
      // 当我们的得分每到 50 分就加 1s
      var scoreElement = $('.score');
      if (parseInt(scoreElement.text()) == 50 && cnt == 0) {
         cnt = 1;
         // 拿到当前进度条宽度
         var progressWidth = $(".progress").width(); 
         // 进度条宽度增加1
         progressWidth += 1;
         // 设置进度条宽度
         $(".progress").css({width: progressWidth});
      }
      else{
         // 拿到当前进度条宽度
         var progressWidth = $(".progress").width(); 
         // 进度条宽度减少1
         progressWidth -= 1;
         // 设置进度条宽度
         $(".progress").css({width: progressWidth});
      }
      // 判断进度条是否走完，如果进度条宽度为0，则停止定时器
      if (progressWidth <= 0) {
         clearInterval(timer);
         $(".mask").stop().fadeIn(100);
         // 停止灰太狼/小灰灰动画
         stopWolfAnimation();
         // // 停止小灰灰动画
         // stopXiaoWolfAnimation();
     }  
   },500/3);
  }


  var wolfTimer;
  // 开启灰太狼/小灰灰动画
  function startWolfAnimation() {
   // 定义保存所有灰太狼动画的数组
   var wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
   // 定义保存所有小灰灰动画的数组
   var xiaoWolf_1 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];
   // 定义一个数组保存所有可能出现的位置
   var arrPos = [
       { left: "100px", top: "115px" },
       { left: "20px", top: "160px" },
       { left: "190px", top: "142px" },
       { left: "105px", top: "193px" },
       { left: "19px", top: "221px" },
       { left: "202px", top: "212px" },
       { left: "120px", top: "275px" },
       { left: "30px", top: "295px" },
       { left: "209px", top: "297px" }
   ];

   // 随机决定显示灰太狼还是小灰灰
   var $wolfImg = $("<img src='' class='wolf'>");
   var $xiaoWolfImg = $("<img src='' class='xiaoWolfImg'>");
   var randomChoice = Math.random() < 0.5 ? 'wolf' : 'xiaoWolf';
   var mainArray = randomChoice === 'wolf' ? wolf_1 : xiaoWolf_1;
   var mainImg = randomChoice === 'wolf' ? $wolfImg : $xiaoWolfImg;
   console.log(mainImg);

   // 随机获取图片位置
   var posIndex = Math.floor(Math.random() * arrPos.length);

   // 设置图片位置
   mainImg.css({
       position: "absolute",
       left: arrPos[posIndex].left,
       top: arrPos[posIndex].top,
       cursor: "pointer"
   });

   // 对于每个角色设定独立的索引范围（假设两者动画帧数相同）
   window[randomChoice + 'Index'] = 0;
   window[randomChoice + 'IndexEnd'] = 5;
   clearInterval(wolfTimer);
   wolfTimer = setInterval(function () {
       if (window[randomChoice + 'Index'] >= window[randomChoice + 'IndexEnd']) {
           mainImg.remove();
           clearInterval(wolfTimer);
           startWolfAnimation(); // 显示下一个随机角色动画
       }
       mainImg.attr("src", mainArray[window[randomChoice + 'Index']++]);
   }, 200);

   // 将图片添加到页面中
   console.log(mainImg);
   $(".container").append(mainImg);
   // 调用处理游戏规则的方法
   gameRules(mainImg, randomChoice);
}


  // 游戏规则处理方法
  function gameRules(element, randomChoice) {
   element.one("click", function () {
       var scoreElement = $('.score');
       var isWolf = randomChoice === 'wolf'; // 判断是否是灰太狼
       var isXiaoWolf = randomChoice === 'xiaoWolf'; // 判断是否是小灰灰
       // 更新分数
       if (isWolf) {
           window[randomChoice + 'Index'] = 5;
           window[randomChoice + 'IndexEnd'] = 9;
           scoreElement.text(parseInt(scoreElement.text()) + 10); // 点击灰太狼加10分
       } else if (isXiaoWolf) {
           window[randomChoice + 'Index'] = 5;
           window[randomChoice + 'IndexEnd'] = 9;
           scoreElement.text(parseInt(scoreElement.text()) - 10); // 点击小灰灰减10分
       }
   });
  } 
  
  // 停止灰太狼/小灰灰动画
  function stopWolfAnimation() {
   //   $(".wolfImg").remove();
   //   $(".xiaoWolfImg").remove();
     // 移除灰太狼和小灰灰的图片
     $(".wolf, .xiaoWolfImg").remove();
     clearInterval(wolfTimer);
  }

  // 重新开始游戏
  $(".reStart").click(function () {
   $(".score").text(0);// 需将分数归零
   $(".mask").stop().fadeOut(100);
   progressHandle();
   startWolfAnimation();
  });

//   // 随机生成两个不相同的0-8的整数
//   function generateUniqueRandomNumbers() {
//    var firstNumber;
//    var secondNumber;
 
//    do {
//      firstNumber = Math.floor(Math.random() * 9);
//      secondNumber = Math.floor(Math.random() * 9);
//    } while (firstNumber === secondNumber);
 
//    return { first: firstNumber, second: secondNumber };
//   }
 
//   var xiaoWolfTimer;
//   // 开启小灰灰动画
//   function startXiaoWolfAnimation() {
//      // 定义保存所有小灰灰动画的数组
//      var xiaoWolf_1 = ['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png'
//         ,'./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
//      // 定义一个数组保存所有可能出现的位置
//      var arrPos = [
//       {left: "202px",top: "212px"},
//       {left: "120px",top: "275px"},
//       {left: "30px",top: "295px"},
//       {left: "209px",top: "297px"},
//       {left: "190px",top: "142px"},
//       {left: "105px",top: "193px"},
//       {left: "19px",top: "221px"},
//       {left: "100px",top: "115px"},
//       {left: "20px",top: "160px"}
//      ]
//      // 创建一个图片
//      var $xiaoWolfImg = $("<img src='' class='xiaoWolfImg'>");
//      // 随机获取图片位置
//      var posIndex = Math.floor(Math.random() * 9);
//      // 设置图片位置
//      $xiaoWolfImg.css({
//          position: "absolute",
//          left: arrPos[posIndex].left,
//          top: arrPos[posIndex].top,
//          cursor: "pointer"
//      });
//      // 设置图片内容
//      window.xiaoWolfIndex = 0;
//      window.xiaoWolfIndexEnd = 5;
//      clearInterval(xiaoWolfTimer);
//      xiaoWolfTimer = setInterval(function () {
//         if (xiaoWolfIndex >= xiaoWolfIndexEnd) { // 狼显示完毕
//            $xiaoWolfImg.remove();// 清空此狼
//            clearInterval(xiaoWolfTimer);// 清除此狼的定时器
//            startXiaoWolfAnimation();// 显示下一只狼
//         }
//         $xiaoWolfImg.attr("src",xiaoWolf_1[xiaoWolfIndex++]);
//      },200);
//      // 将图片添加到页面中
//      $(".container").append($xiaoWolfImg);
//      // 调用处理游戏规则的方法
//      xiaogameRules($xiaoWolfImg);
//   }
//   function xiaogameRules($xiaoWolfImg) {
//    // 如果是灰太狼加10分，小灰灰则减10分
//    // 调用处理游戏规则的方法
//      $xiaoWolfImg.one("click",function () {
//       window.xiaoWolfIndex = 5;
//       window.xiaoWolfIndexEnd = 9;
//       // 小灰灰
//       $('.score').text(parseInt($('.score').text()) - 10);// 扣10分
//   })
//   }

//   // 停止小灰灰动画
//   function stopXiaoWolfAnimation() {
//      $(".xiaoWolfImg").remove();
//      clearInterval(xiaoWolfTimer);
//   }

//   // 开启动画
//   function startAnimation() {

//      // 灰太狼动画
//      startWolfAnimation();
//      // 小灰灰动画
//      startXiaoWolfAnimation();
//   }



//   var wolfTimer;
//   var xiaoWolfTimer;

//   // 开启灰太狼动画
//   function startWolfAnimation() {
//      // 定义保存所有灰太狼动画的数组
//      var wolf_1 = ['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png'
//         ,'./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
//      // 定义保存所有小灰灰动画的数组
//      var xiaoWolf_1 = ['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png'
//         ,'./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
//      // 定义一个数组保存所有可能出现的位置
//      var arrPos = [
//         {left: "100px",top: "115px"},
//         {left: "20px",top: "160px"},
//         {left: "190px",top: "142px"},
//         {left: "105px",top: "193px"},
//         {left: "19px",top: "221px"},
//         {left: "202px",top: "212px"},
//         {left: "120px",top: "275px"},
//         {left: "30px",top: "295px"},
//         {left: "209px",top: "297px"}
//      ]

//      // 创建一个图片
//      var $wolfImg = $("<img src='' class='wolfImg'>");
//      var $xiaoWolfImg = $("<img src='' class='xiaoWolfImg'>"); // 添加小灰灰图片
//      // 随机获取图片位置
//      const uniqueRandomNumbers = generateUniqueRandomNumbers();
//    //   var posIndex = Math.floor(Math.random() * 9);
//      var posIndex = uniqueRandomNumbers.first;
//      var xiaoposIndex = uniqueRandomNumbers.second;
//      // 设置图片位置
//      $wolfImg.css({
//          position: "absolute",
//          left: arrPos[posIndex].left,
//          top: arrPos[posIndex].top,
//          cursor: "pointer"
//      });
//      $xiaoWolfImg.css({
//          position: "absolute",
//          left: arrPos[xiaoposIndex].left,
//          top: arrPos[xiaoposIndex].top,
//          cursor: "pointer"
//      })
//      // 设置图片内容
//      window.wolfIndex = 0;
//      window.wolfIndexEnd = 5;
//      window.xiaoWolfIndex = 0;
//      window.xiaoWolfIndexEnd = 5;
//      clearInterval(wolfTimer);
//      wolfTimer = setInterval(function () {
//       if (wolfIndex >= wolfIndexEnd) { // 狼显示完毕
//          $wolfImg.remove();// 清空此狼
//          $xiaoWolfImg.remove();// 清空此狼
//          clearInterval(wolfTimer);// 清除此狼的定时器
//          startWolfAnimation();// 显示下一只狼
//       }
//       $wolfImg.attr("src",wolf_1[wolfIndex++]);
//       $xiaoWolfImg.attr("src",xiaoWolf_1[xiaoWolfIndex++]);
//      },200);
//      // 将图片添加到页面中
//      $(".container").append($wolfImg, $xiaoWolfImg);
//      // 调用处理游戏规则的方法
//      gameRules($wolfImg, $xiaoWolfImg);
//   }
//   function gameRules($wolfImg, $xiaoWolfImg) {
//      $wolfImg.one("click",function () {
//       window.wolfIndex = 5;
//       window.wolfIndexEnd = 9;
//       // 灰太狼
//       $('.score').text(parseInt($('.score').text()) + 10);// 加10分
//      })
//      $xiaoWolfImg.one("click",function () {
//       window.xiaoWolfIndex = 5;
//       window.xiaoWolfIndexEnd = 9;
//       // 小灰灰
//       $('.score').text(parseInt($('.score').text()) - 10);// 减10分
//      })
//   }
  
//   // 停止灰太狼动画
//   function stopWolfAnimation() {
//      $(".wolfImg").remove();
//    //   $(".xiaoWolfImg").remove();
//      clearInterval(wolfTimer);
//   }
});
