// YOUR CODE HERE:
var removeWhiteSpace = function(string) {
  return string.replace(/ +/g, "");
}

var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  messageHistory: new Set(),
  friends: new Set(),
  chatRooms: new Set(),

  init: function() {
    app.fetch();
    app.handleUsernameClick();
    app.handleSubmit();
    app.handleRoomnameClick();
    app.refreshPage();
  },
  
  send: function(message) {
    this.post(message);
  },
  
  post: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
      },
      error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  // when creating set iterate through set forwards (most recent is first object in set)
  // when rendering new messages render starting from oldest to newest 
  
  fetch: function() {
    return $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: {"order":"-createdAt"},
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Messages requested');
        let messages = data.results;

        // iterate over receivedmessages
        for (let i = messages.length - 1; i >= 0; i--) {
          let messageObj = messages[i];
          let roomname = _.escape(messageObj.roomname);

          // if message hasn't been seen, append to page
          if (!app.messageHistory.has(messageObj.objectId)){
            app.messageHistory.add(messageObj.objectId);
            app.renderMessage(messageObj);
          }

          // if room hasn't been seen, append to page
          if (!app.chatRooms.has(roomname)) {
            app.chatRooms.add(roomname);
            app.renderRoom(roomname);
          }
        }
      },
      error: function() {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        // console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  clearMessages: function() {
    $('#chats').empty();
  },
  
  renderMessage: function(message) {
    // if message sender doesn't have username, set name to anonymous
    let userID = _.escape(message.username) || 'anonymous';
    let userIDClass = removeWhiteSpace(userID);
    let messageText = _.escape(message.text);
    let roomname = _.escape(message.roomname) || 'lobby';
    let roomnameClass = removeWhiteSpace(roomname); 

    let $username = `<a href="#" class="username">${userID}</a>`;
    let $message = `<p class="message">${messageText}</p>`;
    let $chat = `<div class='chat ${userIDClass} ${roomnameClass}'>${$username}: ${$message}</div>`;

    if (app.friends.has(userIDClass)) {
      $($chat).addClass('friend');
    }

    $('#chats').prepend($chat);
  },
  
  renderRoom: function(roomname) {
    $('#roomSelect').append(`<option value="${roomname}">${roomname}</option>`);
  },

  handleUsernameClick: function() {
    $('#main').on('click', '.username', function(event) {
      event.preventDefault(); // stop page from jumping back up to top of page
      let $username = _.escape($(this).text());
      let usernameClass = removeWhiteSpace($username);

      $(`.${usernameClass}`).addClass('friend');
      app.friends.add($username);
    });
  },
  
  handleSubmit: function() {
    $('#main').on('click', '.submit', function(event) {
      event.preventDefault(); // stop page from refreshing

      let yourUsername = location.search.split('username=')[1];
      let messageText = $('#message').val();
      let currentRoomname = $('#roomSelect').val();
      
      let messageToSubmit = {
        username: yourUsername,
        text: messageText,
        roomname: currentRoomname
      };

      app.post(messageToSubmit);
      $('#message').val('');
    });
  },

  handleRoomnameClick: function() {
    $('#roomSelect').on('change', function() {
      let currentRoomClass = removeWhiteSpace($(this).val());

      $('.chat').addClass('filtered');
      $(`.${currentRoomClass}`).removeClass('filtered');
    });
  },

  refreshPage: function() {
    setInterval(app.fetch.bind(app), 1000);
  }
};

$(document).ready(function() {
  app.init();
});