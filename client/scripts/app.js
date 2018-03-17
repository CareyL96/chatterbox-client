// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  
  init: function(){
    var data = app.fetch();
    var userData = data.responseJSON;
    
    userData.forEach((dataObj) => {
      data.renderMessage(dataObj);
    });
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
      success: function () {
        console.log('chatterbox: Message requested');
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
    var $username = `<span class="${message.username}">${message.username}</span>`;
    var $message = `<span class="message">${message.text}</span>`;
    var $room = `<></>`;
    var $chat = `<div>@${$username}: ${$message}</div>`
    $('#chats').append($chat);
  },
  
  renderRoom: function(roomName){
    $('#roomSelect').append(`<div class="${roomName}">${roomName}</div>`);
  },

  handleUsernameClick: function(username) {
    $('#main').find('.username').click(function(){
      
    });
  }
};

  app.init();
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
