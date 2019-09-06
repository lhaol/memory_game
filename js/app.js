/*
 * 创建一个包含所有卡片的数组
 */
let cardList = document.getElementsByClassName("card");
let cards = [...cardList];

let deck = document.querySelector(".deck");

let openCards = [];
let moves = 0;
let count = document.querySelector(".moves");
let timer = document.querySelector(".timer");

let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");

let close= document.getElementById("closeModal");
let popup = document.getElementById("winModal");

document.body.onload = gameStart();

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

function gameStart(){
    openCards = [];
    matched =0
    cards=shuffle(cards);

    deck.innerHTML = "";
    
    for (let card of cards){
        deck.appendChild(card);
        card.classList.remove("show", "open", "match", "disabled");
    };

    cardListener();

    //reset moves
    moves = 0;
    count.innerHTML = moves;

    //reset timer
    let second=0, minute=0, hour=0;
    timer.innerHTML = "00:00:00";

    //reset rating
    star2.className="fa fa-star";
    star3.className="fa fa-star";
}



/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
function cardListener(){
   for (let card of cards){
       card.addEventListener("click", cardClicked); 
   }; 
}

function cardClicked(){
    this.classList.add("open", "show");
    openCards.push(this);
    countMoves();
    this.removeEventListener("click", cardClicked);
    cardMatch(); 
};

function cardMatch() {
    let card1=openCards[0];
    let card2=openCards[1];
    let length= openCards.length;
    if (length === 2){
        if (card1.children[0].classList.toString() === card2.children[0].classList.toString()){
            card1.classList.add("open", "match");
            card2.classList.add("open", "match");
            matched +=1;
            if (matched===8){
                win();
            }
        }
        else{
            closeCards(card1);
            closeCards(card2);
        }
        openCards = [];
    }
}

function closeCards(card){
    setTimeout(function(){
        card.className="card";
        card.addEventListener("click", cardClicked);
    }, 1000);
}

function countMoves(){
    moves++;
    count.innerHTML=moves;
    if (moves ==1){
        startTimer();
    }

    //update Star icon
    if (moves <= 20){
        score=3
    }
    else if (moves<=26){
        score=2
        star3.classList.remove("fa-star");
        star3.classList.add("fa-star-o");
    }
    else{
        score=1
        star2.classList.remove("fa-star");
        star2.classList.add("fa-star-o");
    }
}

//descrip timer for game
let second = 0;
let minute = 0;
let hour = 0;
function startTimer(){
    setInterval(function(){
        timer.innerHTML= hour +":" + minute + ":" +second;
        second++;
        if (second ==60){
            minute++;
            second=0;
        }
        if (minute ==60){
            hour++;
            minute =0;
        }
    }, 1000);
}

//descrip the win function when matched pic is 8.
function win(){
    let finalTime= timer.innerHTML;
    let finalStar = document.querySelector(".stars").innerHTML;
    //show win modal
    popup.style.display = "block";
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("finalStar").innerHTML = finalStar;
    document.getElementById("finalTime").innerHTML = finalTime;
    //close modal
    close.onclick = function() {
            popup.style.display = "none";
        }
    };

