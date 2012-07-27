var Bot    = require('./index');
var AUTH   = 'auth+live+d029059f6076de2bb1dd6516936645991c533a3d';
var USERID = '4fab18d9aaa5cd5942000645';
var ROOMID = '4e209ed114169c25a6007962';  //GA room
//var ROOMID = '4fac8ca9aaa5cd57e400007d';  //test room



var bot = new Bot(AUTH, USERID, ROOMID);

//Define global variable 'modList' as an array of user id's
var modList = [ '4e3e08444fe7d0578e07f7ac',
        '4e0b532ea3f7514663053b61',
        '4df640564fe7d04a1f002abb',
        '4dec476b4fe7d017ac028e39',
        '4e0f3b48a3f751671e04c8c0',
        '4e08c35ea3f7517d1402dfc2',
        '4e0ca5baa3f751467a142308',
        '4e00a5bba3f75104df09592c',
        '4df7e1104fe7d04a2009607e',
        '4e14c693a3f75102de039f7c',
        '4dfad2254fe7d061dc0031b0',
        '4e416a904fe7d02e5e032e2f',
        '4e04cb87a3f751760201f922',
        '4e389ec34fe7d055b9016292',
        '4e271538a3f751245500b552',
        '4dffec954fe7d028bf07310b',
        '4e1da4c54fe7d0314a1124a9',
        '4e4077544fe7d02e5e00ffcb',
        '4e26024a4fe7d05f39042906',
        '4dfa46a1a3f7514a2c025d1c',
        '4dee84044fe7d05893035389',
        '4fab18d9aaa5cd5942000645',
        '4e716dbda3f75112bf1b8f1c',
        '4e29eeea4fe7d0158b07a48f',
        '4e5a9855a3f75174f2089031',
        '4e08cc79a3f7517d000399e4'];

//var isOn = true;

bot.on('speak', function (data) {
    
   // Get the data
   var name = data.name;
   var text = data.text;
   var userid = data.userid;
  
   //check for mod status
   for (var i=0; i<modList.length; i++) {
       if ( userid == modList[i] ){
           var mod = true; 
       }
   }
   
   if (text.indexOf('commands') ==0 && mod == true ) {
       bot.speak('spin, drop, nod, snag, hunt, dip');
   }
   
    if (text.indexOf('commands') ==0 && mod != true ) {
       bot.speak(' dip');
   }
   
   if (text.indexOf('snag') == 0 && mod == true ){
       bot.roomInfo(true, function(data){
           var newSong = data.room.metadata.current_song._id;
               bot.playlistAdd(newSong);
               bot.speak( 'jack mode' );
               bot.snag();
               //console.log(data.room);
               bot.playlistReorder('default',0,30);
               bot.vote('up');
        });
   }
   
   if (text.indexOf('playlist') == 0 && mod == true){
       bot.playlistAll(function (data) {
           console.log(data.list.length)
           //console.log(data.list)
       });
   }
   
   //Spin
   if (text.indexOf("spin") == 0){
       bot.addDj();
   }
   
   //Drop
   if (text.indexOf("drop") == 0){
       bot.remDj();
   }
   
   //Skip
   if (text.indexOf("skip") == 0){
       bot.skip();
   }
   
   //nod
   if (text.indexOf("nod") == 0){
       bot.vote('up'); 
   }
  

   //set avatar
   if (text.indexOf("rilla up") == 0){
       bot.setAvatar( 23 );
   }

 	//Gorilla facts
           if (text.indexOf("have a banana") == 0){
               //bot.speak('random fact')
               var fs = require('fs');
               var factsArray = fs.readFileSync('./Gorilla.txt').toString().split("\n");
               var x = Math.floor((Math.random()*factsArray.length )+1);
               
               bot.speak(factsArray[x])    
           }
   
   //find new songs
   if (text.indexOf("hunt") == 0){
       bot.speak( 'search' );
       bot.listRooms(0, function(resp){
           var added = 0;
           var room = resp.rooms;
           resp.rooms.forEach(function(room) {
               if (room[0].name == 'Hip Hop - We Got It') {
               var songId = room[0].metadata.current_song._id;
               var songName = room[0].metadata.current_song.metadata.song;
               var artist = room[0].metadata.current_song.metadata.artist;
               bot.playlistAdd(songId);
               //console.log("Added song: " + songId + " from room " + room[0].name);
               bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
               bot.playlistReorder('default',0,30);
               //console.log(room[0].name);
               added++
                }
                
                else if (room[0].name == 'The Real Hip Hop Is Over Here!'){
                    var songId = room[0].metadata.current_song._id;
                    var songName = room[0].metadata.current_song.name;
                    var artist = room[0].metadata.current_song.metadata.artist;
                     bot.playlistAdd(songId);
                    //console.log("Added song: " + songId + " from room " + room[0].name);
                    bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
                    bot.playlistReorder('default',0,30);
                    //console.log(room[0].name);
                    added++
                }
                else if (room[0].name == 'Hip Hop : Shaolin Temple'){
                    var songId = room[0].metadata.current_song._id;
                    var songName = room[0].metadata.current_song.name;
                    var artist = room[0].metadata.current_song.metadata.artist;
                    bot.playlistAdd(songId);
                    //console.log("Added song: " + songId + " from room " + room[0].name);
                    bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
                    bot.playlistReorder('default',0,30);
                    //console.log(room[0].name);
                    added++
                }
                else if (room[0].name == 'Hip-Hop/Jazz/Soul/Funk/Breaks/Samples'){
                    var currentSong = room[0].metadata.current_song;
                    if ( currentSong != null ){
                        var songId = room[0].metadata.current_song._id;
                        var songName = room[0].metadata.current_song.name;
                        var artist = room[0].metadata.current_song.metadata.artist;
                        bot.playlistAdd(songId);
                        //console.log("Added song: " + songId + " from room " + room[0].name);
                        bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
                        bot.playlistReorder('default',0,30);
                        //console.log(room[0].name);
                        added++
                    }
                }
                else if (room[0].name == 'Hip Hop Origins'){
                    var currentSong = room[0].metadata.current_song;
                    if ( currentSong != null ){
                        var songId = room[0].metadata.current_song._id;
                        var songName = room[0].metadata.current_song.name;
                        var artist = room[0].metadata.current_song.metadata.artist;
                        bot.playlistAdd(songId);
                        //console.log("Added song: " + songId + " from room " + room[0].name);
                        bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
                        bot.playlistReorder('default',0,30);
                        //console.log(room[0].name);
                        added++
                    }
                }
                else{
                    //console.log('fail');
                }
           });
       });
   }


   //escort
   if (text.indexOf("dip") == 0){
       //var dipDj = data.userid;
       bot.speak('[pounds chest]');
       var dropList = [];
       //var user = data.user[0];
       //var user = data.name;
       dropList.push(data.userid);
       //console.log(data);
       
       //console.log(userid);
       bot.on('endsong', function (data) {
           var currentDj = data.room.metadata.current_dj;
           //console.log(currentDj);
           
           for (var i=0; i<dropList.length; i++){
               if ( currentDj == dropList[i] ) {
                   //console.log(dropList[i]);
                   bot.remDj(currentDj);
                   delete dropList[ currentDj ];
                   //console.log(dropList);
               }
           }
       });
       
       bot.on('rem_dj', function (data) {
           var droppedDj = data.user[0].userid;
           for (var i=0; i<dropList.length; i++){
               if ( droppedDj == dropList[i] ) {
                   console.log(data.user[0].userid);
                   //delete dropList[dj];
                   dropList.splice(dropList.indexOf(droppedDj), 1);
                   console.log(dropList)
               }
           }
       });
   }
});

//Greet mods
bot.on('registered', function (data) {
    //get data
    var room = data.room;
    var user = data.user[0];
    var name = user.name;
    
    //greet new user
    //setTimeout(10000)
    
    if (name == 'the unicorn'){
        bot.speak('unicorn power!');
    }
    
    if (name == 'The Philoso:fist:'){
        bot.speak(':fist:');
    }
    
    if (name == 'RyanTheMagnificent'){
        bot.speak('Get your blunts and hide your wives. Ryan The Magnificent is here!');
    }
    
    if (name == 'Warrior Scholar'){
        bot.speak('King Kong ain\'t got SHIT on the Warrior Scholar!!');
    }
    
    if (name == 'DeeJay FullHouse'){
        bot.speak('what is that smell? ben gay? oh, it\'s fullhouse');
    }
    
    bot.roomInfo( true , function (data) {
       var numDjs = data.room.metadata.djs.length;
       
        if ( numDjs < 4 ) {
            bot.addDj();
        }
   
        else if (numDjs > 4 ) {
            bot.remDj();
        }
   });
    
});

bot.on('newsong', function (data) {
   var room = data.room;
   var currentSong = room.metadata.current_song._id;
   
   bot.playlistAll( function (data) {
       //console.log(data);
       //console.log(data.list[0]._id);
       //console.log(data.list.length);
       for (var i=0; i<10; i++) {
           if ( currentSong == data.list[i] ) {
               bot.playlistReorder('default',0,data.list.length);
           }
       }
   });
   
   bot.roomInfo( true , function (data) {
       var numDjs = data.room.metadata.djs.length;
       //console.log(numDjs);
       
        if ( numDjs < 4 ) {
            bot.addDj();
        }
   
        else if (numDjs > 4 ) {
            bot.remDj();
        }
   });
});

bot.on('update_votes', function (data) {
   var room = data.room;
   var listeners = room.metadata.listeners - 2;
   var upvotes = ( room.metadata.upvotes );
   var downvotes = ( room.metadata.downvotes );
   var percentUp = upvotes / listeners;
   var percentDown = downvotes / listeners;
   //console.log(data.room.metadata.votelog[0][0]);
   
   //J removes song from playlist
   if ( room.userid == '4fab18d9aaa5cd5942000645' ){
       if ( percentDown >= .75){
           bot.playlistRemove();
           bot.speak('song removed from playlist');
       }
   }
   
   //J up votes a song
   else if ( percentUp >= .75){
       bot.vote('up');
       if ( data.room.metadata.votelog[0][0] == '4fab18d9aaa5cd5942000645' ){
       bot.speak('bananas!');
       }
   }
});

//warn user to set avatar to gorilla, if not set by next song J will drop the DJ
bot.on('add_dj', function (data) {
     //console.log(data);
     
     if ( data.user[0].avatarid != 23 ){
            bot.speak( data.user[0].name + ' put on your Rilla suit!' )
            //setTimeout(100000)
            bot.remDj( data.user[0].userid );
        }
    });

//stuff to say to fullhouse:
//this shit so old jay remembers it coming out
//this shit so old jay bought the music video on beta

//to do
