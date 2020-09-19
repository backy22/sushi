// infinite rounding
var conveyor = document.getElementById("conveyor");
var roundNumber = 0;

//// sushi on a plate is coming randomly  per 2 second
function makeSushi(){
  setTimeout(function(){
    var sushiNum = Math.floor(Math.random()*21) + 1;
    var plateNum = Math.floor(Math.random()*5) + 1;
    conveyor.insertAdjacentHTML('afterbegin', '<div class="sushi-position" id="number'+ roundNumber + '"><div class="round-sushi" onclick="takePlate(this)" ontouchstart"takePlate(this)"><img class="plate" src="img/plate' + plateNum + '.png"><img class="sushi" src="img/sushi' + sushiNum+ '.png"></div></div>');
    var sushiPosition = document.getElementById("number"+roundNumber);
    if (sushiPosition){
      var rightDis = -20;
      moving(sushiPosition,rightDis);
    }
    roundNumber++;
    window.requestAnimationFrame(makeSushi);
  }, 2000)
}

window.requestAnimationFrame(makeSushi);

//// moving sushi from right to left
function moving(sushiPosition,rightDis){
  var intervalEvent = setInterval(function(){
    sushiPosition.style.right = rightDis + '%';
    if (rightDis > 120){
      clearInterval(intervalEvent);
    }
    rightDis++;
  }, 100);
}

// take sushi plate then sushi plate move on the table and he eats sushi and plate moves on the pile of plates
var table = document.getElementById("table");
var finishedPlates = document.getElementById("finished-plates");
var bottomDis = 0;
var topDis;
var plateCount = 0;

function takePlate(roundSushi) {
  table.insertAdjacentElement('afterbegin', roundSushi);
  var plate = roundSushi.firstChild;
  var sushi = roundSushi.lastChild;
  setTimeout(function(){
    plate.style.position = 'relative';
    sushi.style.left = '-20vw';
    plateCount = finishedPlates.childElementCount;
    if (plateCount == 0 || topDis < -20){
      bottomDis = 0;
    }
    finishedPlates.insertAdjacentHTML('afterbegin', "<div class='finished-plate'></div>");
    var finishedPlate = document.querySelector('.finished-plate');
    plateCount = plateCount + 1;
    bottomDis = bottomDis + 30;
    finishedPlate.style.zIndex = plateCount;
    finishedPlate.style.bottom = bottomDis + "px";
    finishedPlate.insertAdjacentElement('afterbegin', roundSushi.firstChild);
    var clientRect = finishedPlate.getBoundingClientRect();
    topDis = clientRect.top;
  }, 1000);
  setTimeout(function(){
    sushi.style.visibility = 'hidden';
  }, 1500);
}

// when click check button, caluculate the number of plates and show the bill
var checkButton = document.getElementById("check");
var section = document.querySelector("section");

checkButton.addEventListener("click", function(){
  section.insertAdjacentHTML('beforeend', '<div id="overlay"></div>');
  var overlay = document.getElementById("overlay");
  section.insertAdjacentHTML('beforeend', '<div id="bill"><p>Your bill is<br>$2 × ' + plateCount + ' plates = $' + 2*plateCount + '</p><button id="complete">Payment Complate!</button>');
  var bill = document.getElementById("bill");
  // when click the complete button, piled plateds are removed and show the message of thank you
  var completeButton = document.getElementById("complete");
  completeButton.addEventListener("click", function(){
    bill.parentNode.removeChild(bill);
    finishedPlates.textContent = null;
    section.insertAdjacentHTML('beforeend', '<div id="thanks"><p>Thank you!</p></div>');
    var thanks = document.getElementById('thanks');
    if (thanks){
      overlay.addEventListener("click", function(){
        thanks.parentNode.removeChild(thanks);
        overlay.parentNode.removeChild(overlay);
      });
    }
  });
});

