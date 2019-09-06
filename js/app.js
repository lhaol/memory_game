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
    timer.innerHTML = "00:00:00"

    //reset rating
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