var express = require('express');
const mongoose = require('mongoose');
const SeleniumRecord = require('../modules/selenium');
var Trello = require("trello");
var trello = new Trello("28df62567338bd5ede6bc84fa6ef59a9", "98119a05870d300a5d5463fd777eb526fff0267c899c7b22dfe669f53b6e0d36");

var router = express.Router();


/* GET home page. */


function insertError(my_val)
{
  var count_myError = SeleniumRecord.findOne({error_value: my_val.error_value}).exec().then(count_myError => {
      if(count_myError.length >= 1)
      {
            getaddTrelloError(count_myError)
            return count_myError;
      }else{
        const user = new SeleniumRecord({
                      _id: new mongoose.Types.ObjectId(),
                        error_value : my_val.error_value,
                        getCardsOnList : my_val.getCardsOnList,
                        addChecklistToCard : my_val.addChecklistToCard
                      });
        user.save();
        insertTrelloError(my_val)
          return 'user insert successfully';
      }
    });
}

function insertTrelloError(input)
{
  var cardsPromise = trello.addCard(input.error_value, 'google console', input.getCardsOnList);
      cardsPromise.then((cards) => {
              trello.addChecklistToCard(cards.id,checkList[i]);
      });
}

function getaddTrelloError(input)
{
  var cardsPromise = trello.getCardsOnList(input.getCardsOnList);
  cardsPromise.then((cards) => {
      trello.addChecklistToCard(input.addChecklistToCard,input.error_value);
      res.json(cards);
  });
}



router.get('addcard/:id', function(req, res, next) {
  var my_valuse = req.params.id;
  // trello.addCard(my_valuse, 'google console', '5a181330dd40811fb5cdbda5');
  // insertError(my_valuse);
  res.json(my_valuse);
});

// function insertError(cardName,checkList)
// {
//     let loopArr = new Array();
//     // var cardsPromise = trello.addCard(cardName, 'google console', '5a181330dd40811fb5cdbda5');
//     // cardsPromise.then((cards) => {
//         for(var i =0; i < checkList.length; i++)
//         {
//           loopArr[i] = checkList[i];
//         }
//             // trello.addChecklistToCard(cards.id,checkList[i]);
//     // });
//     return loopArr;
// }

router.get('/:id', async function(req, res, next) {

    // var cardsPromise = trello.addChecklistToCard('5dfc63dd6584845099adeab1','admin 05');
    // cardsPromise.then((cards) => {
    //     res.json(cards);
    // });

    var my_val = {
                error_value: '1wayit.com mobile usability 78',
                getCardsOnList: '5a181330dd40811fb5cdbda5',
                addChecklistToCard: '5e047d63d420fb34038bc849'
      }
    var my_vals = await insertError(my_val);
    // var cardsPromise = trello.getCardsOnList('5a181330dd40811fb5cdbda5');
    // cardsPromise.then((cards) => {
    //     // trello.addChecklistToCard('5e047d63d420fb34038bc849','111111111aaaaaaaa');
    //     res.json(cards);
    // });

      // var my_checkList = ['admin-1','admin-2','admin-3'];
      // var my_valuse = req.params.id;
      //
      // res.json(insertError(my_valuse,my_checkList));

      res.json(my_vals);

    //

});



module.exports = router;
