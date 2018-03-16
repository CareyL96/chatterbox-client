// YOUR CODE HERE:
class App {
  constructor(){
    this.server = "http://parse.sfm8.hackreactor.com/chatterbox"
    // this.
    this.friends = [];
  }
  
  init(){
    
  }
  
  send(message){
    this.post(message);
  }
  
  post(message){
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
  }
  fetch(){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
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
  }
  
  clearMessages(){
    $('#chats').empty();
  }
  
  renderMessage(message) {
    var $username = `<span class="username">${message.username}</span>`;
    var $message = `<span class="message">${message.text}</span>`;
    var $room = `<></>`;
    var $chat = `<div>@${username}: ${message}</div>`
    $('#chats').append($chat);
  }
  
  renderRoom(roomName){
    $('#roomSelect').append(`<div class="room">${roomName}</div>`);
  }

  handleUsernameClick(username) {
    $('#main').find('.username').click(function(){
      
    });
  }
}

var app = new App();

