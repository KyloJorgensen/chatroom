'use strict';

$(document).ready(function() {
    var socket = io();
    var input = $('#messagebox');
    var nickname = $('#nickname');

    var messages = $('#messages');

    var addMessage = function(message, name) {
        messages.append('<div>' + name + ': ' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        var name = nickname.val();
        addMessage(message, 'You');
        socket.emit('message', message, name || 'User');
        input.val('');
    });

    socket.on('message', addMessage);
});