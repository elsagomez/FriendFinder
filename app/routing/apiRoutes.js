var friendData = require('../data/friends.js');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    })

    app.post('/api/friends', function(req, res) {
        var newFriend = req.body;
        console.log("newFriend: ", newFriend);

        for (var i = 0; i < newFriend.scores.length; i++) {
        	newFriend.scores[i]=parseInt(newFriend.scores[i]);
        }

        var differenceArr = [];

        for(i=0; i< friendData.length; i++){

        var friendsToCompare = friendData[i]
        var differenceTotal = 0

        for(var j=0;  j<friendsToCompare.scores.length; j++){
        	var difference = Math.abs(friendsToCompare.score[j] - newFriend.scores[j]);
        	differenceTotal  +=	difference;
        }

        differenceArr[i] = differenceTotal;
    }

    var matchFriendScore = differenceArr[0];
    var matchFriendIndex = 0;

    for(var i=1; i<differenceArr.length; i++){
        if(differenceArr[i] < matchFriendScore){
            matchFriendScore= differenceArr[i];
            matchFriendIndex = i;
        }
    }

    friendData.push(newFriend);

    res.json(friendData[matchFriendIndex]);

    })


}
