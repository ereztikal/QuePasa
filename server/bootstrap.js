Meteor.startup(function () {
    // Using Meteor’s authentication Accounts-phone package
    // Adding hard-coded users for presentation
    if (Accounts.users.find().count() === 0) {
        Accounts.createUserWithPhone({
            phone: '+972501234567',
            profile: {
                name: 'John Doe',
                picture: 'http://www.erezcarmel.com/wp-content/uploads/2012/07/profilepic.jpg'
            }
        });

        Accounts.createUserWithPhone({
            phone: '+972501234568',
            profile: {
                name: 'Mister Lego',
                picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg'
            }
        });

        Accounts.createUserWithPhone({
            phone: '+972501234569',
            profile: {
                name: 'Jane Doe',
                picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
            }
        });
    }

    // Mockup chat for presentation
    if (Chats.find({_id: "demoChat1"}).count() === 0) {
        var chat = {
            _id: "demoChat1",
            userIds: [ 'dBfAzknKbTj89jKdE', 'k9Rk2ZsufYJr4BeFq' ],
            createdAt: new Date()
        };

        Chats.insert(chat);
        var messages = [
            {
                "text" : "Hi there!",
                "type" : "text",
                "chatId" : chat._id,
                "timestamp" : new Date(),
                "userId" : "dBfAzknKbTj89jKdE"
            },{
                "text" : "Que pasa?",
                "type" : "text",
                "chatId" : chat._id,
                "timestamp" : new Date(),
                "userId" : "k9Rk2ZsufYJr4BeFq"
            },
            {
                "text" : "All good my man",
                "type" : "text",
                "chatId" : chat._id,
                "timestamp" : new Date(),
                "userId" : "dBfAzknKbTj89jKdE"
            }
        ];

        Messages.insert(messages[0]);
        Messages.insert(messages[1]);
        Messages.insert(messages[2]);
        Chats.update(chat._id, {$set: {lastMessage: messages[2]}});
    }
});