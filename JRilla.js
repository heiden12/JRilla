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

bot.on('speak', function (data) {
    
   // Get the data
   var name = data.name;
   var text = data.text;
   var userid = data.userid;
  
   //mod commands
   for (var i=0; i<modList.length; i++) {
       if ( userid == modList[i] ){
        
           //add song to queue
           if (text.match(/^\/snag$/)){
               bot.roomInfo(true, function(data){
                   var newSong = data.room.metadata.current_song._id;
                       bot.playlistAdd(newSong);
                	   bot.speak( 'jack mode' );
                       bot.snag();
                       bot.playlistReorder('default',0,30);
                       bot.vote('up');
                });
            }
            
           //room data
           if (text.match(/^\/data$/)){
               bot.roomInfo(true, function(data){
               });
           }
           
           //Spin
           if (text.match(/^\/spin$/)){
               bot.addDj();
           }
           
           //Drop
           if (text.match(/^\/drop$/)){
               bot.remDj();
           }
           
           //Skip
           if (text.match(/^\/skip$/)){
               bot.skip();
           }
           
           //nod
           if (text.match(/^\/nod$/)){
               bot.vote('up');
           }
           
           //J lists mod commands
           if (text.match(/^\/commands$/)){
                bot.speak('/spin /drop /nod /snag /hunt /dip');
               }
           
           //set avatar
           if (text.match(/^\/rilla$/)){
               bot.setAvatar( 23 );
           }
        
           //find new songs
           if (text.match(/^\/hunt$/)){
               bot.speak( 'let the hunt begin' );
               bot.listRooms(0, function(resp){
                   var added = 0;
                   var room = resp.rooms;
                   resp.rooms.forEach(function(room) {
                       if (room[0].name == 'Hip Hop - We Got It') {
                       var songId = room[0].metadata.current_song._id;
                       var songName = room[0].metadata.current_song.metadata.song;
                       var artist = room[0].metadata.current_song.metadata.artist;
                       bot.playlistAdd(songId);
                       bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
                       bot.playlistReorder('default',0,30);
                       added++
                        }
                        
                        else if (room[0].name == 'The Real Hip Hop Is Over Here!'){
                            var songId = room[0].metadata.current_song._id;
                            var songName = room[0].metadata.current_song.name;
                            var artist = room[0].metadata.current_song.metadata.artist;
                             bot.playlistAdd(songId);
                            bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
                            bot.playlistReorder('default',0,30);
                            added++
                        }
                        else if (room[0].name == 'Hip Hop : Shaolin Temple'){
                            var songId = room[0].metadata.current_song._id;
                            var songName = room[0].metadata.current_song.name;
                            var artist = room[0].metadata.current_song.metadata.artist;
                            bot.playlistAdd(songId);
                            bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
                            bot.playlistReorder('default',0,30);
                            added++
                        }
                        else if (room[0].name == 'Hip-Hop/Jazz/Soul/Funk/Breaks/Samples'){
                            var songId = room[0].metadata.current_song._id;
                            var songName = room[0].metadata.current_song.name;
                            var artist = room[0].metadata.current_song.metadata.artist;
                            bot.playlistAdd(songId);
                            bot.speak("Added song: " + songName + " by " + artist + " from room " + room[0].name);
                            bot.playlistReorder('default',0,30);
                            added++
                        }
                        else{
                            //console.log('fail');
                        }
                   });
               });
           }
           
       break;
       }
   }
    
    
       
   //J lists user commands
   if (text.match(/^\/commands$/)){
       bot.speak('/dip');
   }
   
   //escort
   if (text.match(/^\/dip$/)){
       bot.speak('[pounds chest]');
       var dropList = [ ];
       dropList.push(data.userid);

       bot.on('endsong', function (data) {
           var currentDj = data.room.metadata.current_dj;
           
           for (var i=0; i<dropList.length; i++){
               if ( currentDj == dropList[i] ) {
                   bot.remDj(currentDj);
                   delete dropList[ currentDj ];
               }
           }
       });
       
       bot.on('rem_dj', function (data) {
           var droppedDj = data.user[0].userid;
           for (var i=0; i<dropList.length; i++){
               if ( droppedDj == dropList[i] ) {
                   dropList.splice(dropList.indexOf(droppedDj), 1);
               }
           }
       });
   }
   
    if (text.match(/^\/data$/)){
               bot.roomInfo(true, function(data){
                   var mods = data.room.metadata.moderator_id;
               console.log(data.room.metadata.djs);
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
    setTimeout(10000)
    
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
       for (var i=0; i<10; i++) {
           if ( currentSong == data.list[i] ) {
               bot.playlistReorder('default',0,data.list.length);
           }
       }
   });
   
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

bot.on('update_votes', function (data) {
   var room = data.room;
   var listeners = room.metadata.listeners - 2;
   var upvotes = ( room.metadata.upvotes );
   var downvotes = ( room.metadata.downvotes );
   var percentUp = upvotes / listeners;
   var percentDown = downvotes / listeners;
   
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
     
     if ( data.user[0].avatarid != 23 ){
            bot.speak( data.user[0].name + ' put on your Rilla suit!' )
            setTimeout(100000)
            bot.remDj( data.user[0].userid );
        }
    });