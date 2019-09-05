/*
 * 创建一个包含所有卡片的数组
 */
let cardList = document.getElementsByClassName("card");
let cards = [...cardList];

let deck = document.querySelector(".deck");

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
    moves = 0;
    // time = 0;
    cards=shuffle(cards);

    deck.innerHTML = "";
    
    for (let card of cards){
        deck.appendChild(card);
        card.classList.remove("show", "open", "match", "disabled");
    };

    cardListener();


    //add timer
    //ranking star
    //moves

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
       card.addEventListerner("click", cardClicked); 
   }; 
}

function cardClicked(){
    this.classList.add('open', 'show');
    openCards.push(this);
    if(moves===0){
        timer = setInterval (timeit, 1000);
    }
    moves+=1;
    this.removeEventListener("click", cardClicked);
    cardMatch ();
};

function cardMatch() {
    
}
