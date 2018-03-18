// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  friends: new Set(),
  rooms : new Set(),
  
  init: function(){
    app.fetch();
    // app.refreshPage();
    app.handleUsernameClick();
    app.handleSubmit();
    app.handleRoomNameClick();
  },
  
  send: function(message){
    this.post(message);
  },
  
  post: function(message){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  fetch: function(){
    return $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: {"order":"-createdAt"},
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message requested');
        
        data.results.forEach((dataObj) => {
          app.renderMessage(dataObj);
        });
        
        app.usernames = new Set();
        data.results.forEach((dataObj) => {
          dataObj.username = dataObj.username || 'undefined';
          dataObj.roomname = dataObj.roomname || 'lobby';
          app.usernames.add(dataObj.username.split(" ").join(""));
          app.rooms.add(dataObj.roomname.split(" ").join(""));
        });
        [...app.rooms].forEach(room => app.renderRoom(room))
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        // console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  clearMessages: function(){
    $('#chats').empty();
  },
  
  renderMessage: function(message) {
    var roomname = message.roomname || 'lobby'
    roomname = app.removeWhiteSpace(roomname);
    var userId = message.username || 'undefined';
    var $username = `<span class="username" id=${userId.split(' ').join('')}>${message.username}</span>`;
    var $message = `<span class="message">${_.escape(message.text)}</span>`;
    var $chat = `<div class='chat ${roomname}'>@${$username}: ${$message}</div>`
    $('#chats').append($chat);
  },
  
  renderRoom: function(roomName){
    $('#roomSelect').append(`<option value="${roomName}">${roomName}</option>`);
  },

  handleUsernameClick: function() {
    $('#main').on('click','.username',function(){
      var username = $(this).text();
      app.friends.add(username);
      // $(asdfasdf).addClass('friends');
      console.log('friend added');
      // when username is clicked, push to app.friends
      $(`#${username}`).addClass('friends');
      
      // when friend is added
        // get username
        // add username to app friends
        // use username to add friends class all dom nodes of friend
    });
  },
  
  refreshPage: function() {
    setInterval(function (){app.fetch()}, 2000);
    // app.fetch();
  },
  
  handleSubmit: function() {
    $('#main').on('click','.submit',function(event){
      event.preventDefault();
      // console.log($('#message').val());
      // username
      // text
      // room
      var username = location.search.split('username=')[1];
      var text = $('#message').val();
      // var roomname = (roomselector).text();
      var message = {
        username: username,
        text: text 
      }
      app.post(message);
      console.log(message);
      $('#message').val('');
    });
  },
  
  handleRoomNameClick: function() {
    $('#roomSelect').on('change', function() {
      var currentRoom = $(this).val();
      console.log($(this).val());
      // format currentRoom white space etc... (taken care of in the renderMessage)
      // loop through chats
      $('.chat').addClass('filtered');
      $(`.${currentRoom}`).removeClass('filtered');
      $('.filtered').slideToggle();
      //
    });
  },
  removeWhiteSpace: function(string){
    
    return string.split(" ").join("");
  }
};

$(document).ready(function(){
  app.init();
});
// $(document).ready(function(){
//   // var user = new App();
//   // var data = user.fetch();
//   // var userData = data.responseJSON.results;
  
//   // userData.forEach((dataObj) => {
//   //   user.renderMessage(dataObj);
//   // });
// });

// displaying data

// fetch data
// save data into variable
// iterate through data variable
// render messages from variable 
