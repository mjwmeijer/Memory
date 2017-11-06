var MatchGame = {};
var numberOfMoves=0;

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 or 6*6 board of cards.
*/
$(document).ready(function(){
  $('#game').attr({'data-keuze':'getallen','data-aantal':'16'}); //indien geen keuze wordt gemaakt

  $('.btn').click(function(){
    $(this).attr('disabled',true);
  })

  $('#getallen').click(function(){
    $('#letters, #rekenen, #plaatjes').remove();
  })

  $('#letters').click(function(){
    $('#getallen, #rekenen, #plaatjes').remove();
  })

  $('#rekenen').click(function(){
    $('#letters, #getallen, #plaatjes').remove();
  })

  $('#plaatjes').click(function(){
    $('#letters, #rekenen, #getallen').remove();
  })

      $('#plaatjes').click(function(){
        $('#advanced').remove();
      })

      $('#beginner').click(function(){
        $('#advanced').remove();
      })

      $('#advanced').click(function(){
        $('#beginner').remove();
      })

      $('.btn').click(function() {
      $('#game').attr({'data-keuze':$(this).data('keuze'),
    'data-aantal':$(this).data('aantal')});
      $(this).css('background-color','violet')
    });

    $('#herhaling').click(function(e){
      e.preventDefault();
  //  var url = $(this).data('target');
//    location.replace(url);
location.reload();
  });

  MatchGame.renderCards(MatchGame.generateCardValues(8),$('#game'));

  $('#beginner').click(function() {
    MatchGame.renderCards(MatchGame.generateCardValues(8),$('#game'))});

    $('#advanced').click(function() {
      MatchGame.renderCards(MatchGame.generateCardValues(18),$('#game'))});
});

/*
  Generates and returns an array of matching card values.
 */


MatchGame.generateCardValues = function (aantal) {
  var verzamelingGeordend =[];
  var letters = ['a','b','d','e','aa','f','h','ee','oe','k','i','m','n','oo','r','s','t','ij'];
  var rekenen =[['10+2','6+6'],['4+3','3+4'],['2+2','6-2'],
  ['3-1','1+1'],['3-2','1'],['6-3','2+1'],['7-2','4+1'],['3+3','1+5'],['4+4','4+4'],['5+4','6+3'],
['3+7','13-3'],['2+9','1+10'],['9+4','2+11'],['16-2','7+7'],['18-3','6+9'],['8+8','1+15'],['9+8','3+14'],
['20-2','6+6+6']]
  for(i=1;i<aantal+1;i++){
    verzamelingGeordend.push({number:i,
    letter:letters[i-1],uitkomst:rekenen[i-1][0],picture:"url(\"vlinder"+i+".jpg\")"});
    verzamelingGeordend.push({number:i,
    letter:letters[i-1],uitkomst:rekenen[i-1][1],picture:"url(\"vlinder"+i+".jpg\")"});
  }
  var verzamelingRandom =[];
  while(verzamelingGeordend.length>0){

    var randomIndex = Math.floor(Math.random()*verzamelingGeordend.length);
    verzamelingRandom.push(verzamelingGeordend[randomIndex]);

  verzamelingGeordend.splice(randomIndex,1);
  }
  return verzamelingRandom;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  kleuren =['hsl(25,85%,65%)','hsl(55,85%,65%)','hsl(90,85%,65%)',
  'hsl(160,85%,65%)','hsl(220,85%,65%)','hsl(265,85%,65%)','hsl(310,85%,65%)','hsl(360,85%,65%)','hsl(25,45%,65%)','hsl(55,45%,65%)','hsl(90,45%,65%)',
  'hsl(160,45%,65%)','hsl(220,45%,65%)','hsl(265,45%,65%)','hsl(310,45%,65%)','hsl(360,45%,65%)','hsl(25,85%,65%)','hsl(55,85%,65%)']
$game.empty();
$game.data('flippedCards',[]);
$game.data('flippedCards2',[]);

for(i=0;i<cardValues.length;i++){
  var generateCard = {
    cardValue:cardValues[i].number,
    cardLetter:cardValues[i].letter,
    cardUitkomst:cardValues[i].uitkomst,
    cardPicture:cardValues[i].picture,
    isFlipped:false,
    kleur:kleuren[cardValues[i].number-1],
    src:cardValues[i].picture
  }
  if(cardValues.length===16)
  {var newCard = $('<div></div>').addClass('card col-sm-3').data(generateCard)}
  else   {var newCard = $('<div></div>').addClass('card col-sm-2').data(generateCard);}

console.log($(newCard).data('isFlipped'))

$($game).append(newCard);
}

/*
var cardWidth = $('.card').outerWidth();
$('.card').css('height',cardWidth);
*/

$('.card').click(function() {
  MatchGame.flipCard($(this), $('#game'));
  });
};


/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  numberOfMoves+=1;
var moves = $('<h1></h1>').addClass('moves').text('Moves: 1');
var movesOneven = $('<h1></h1>').addClass('moves').text('Moves: '+(numberOfMoves-1)/2);
var movesEven = $('<h1></h1>').addClass('moves').text('Moves: '+ numberOfMoves/2);

if (numberOfMoves === 2) {$('#instructions').append(moves)}
else if(numberOfMoves%2===1) {$('.moves').replaceWith(movesOneven);}
else {$('.moves').replaceWith(movesEven);}


  if ($card.data('isFlipped')) {
    return;}

else if($game.attr('data-keuze')==='plaatjes'){
  $card.css({'background-image':$card.data('cardPicture'),'background-size':'cover'}).data('isFlipped',true)
  }

else {$card.css('background-color',$card.data('kleur')).data('isFlipped',true);
switch($game.attr('data-keuze')){
case "letters":
    $card.text($card.data('cardLetter'));
    break;
case "getallen":
    $card.text($card.data('cardValue'));
    break;
case "rekenen":
    $card.text($card.data('cardUitkomst')).css('font-size','3rem');
    break;}
      }


        var flippedCards = $game.data('flippedCards');
        var flippedCards2 = $game.data('flippedCards2');
        flippedCards.push($card);


        if (flippedCards.length === 2) {
          if (flippedCards[0].data('cardValue') === flippedCards[1].data('cardValue')) {
            var matchCss = {
              'background-color':'rgb(153, 153, 153)',
              'color': 'rgb(204, 204, 204)',
              };
            var matchCssPlaatjes ={
              'opacity':0.4
            };

          if($game.attr('data-keuze')==='plaatjes'){
            flippedCards[0].css(matchCssPlaatjes);
            flippedCards[1].css(matchCssPlaatjes);
            }
          else {flippedCards[0].css(matchCss);
          flippedCards[1].css(matchCss);}

          flippedCards2.push(flippedCards[0]);
          flippedCards2.push(flippedCards[1]);
        }


            else {
            var card1 = flippedCards[0];
            var card2 = flippedCards[1];
            window.setTimeout(function() {
              card1.css({'background-color':'rgb(32, 64, 86)',
            'background-image':''})
                  .text('')
                  .data('isFlipped', false);
                  card2.css({'background-color':'rgb(32, 64, 86)',
                'background-image':''})
                      .text('')
                      .data('isFlipped', false);
            }, 1000);
          }
          $game.data('flippedCards', []);
        }
        if (flippedCards2.length===$game.data('aantal')){
          window.setTimeout(function() {
            $('#voorbij').css('display','flex');},500);
        }
}
