Meteor.startup(function () {
    // Using Meteor’s authentication Accounts-phone package
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

    var socket = io('wss://w2.web.whatsapp.com/ws', {tag:'1445540456.--0',data:["admin", "init", [0,1,4770], ["Mac OS 10.10.5","Chrome"], "5XzFmdz0/jd0GIUEyoy/Pw==", true]});
//    console.log(socket);
//    socket.emit('subscribe', 'data-feed-name-goes-here');

    socket.on('connect', Meteor.bindEnvironment(function() {
        console.log('Connected to the websocket!');
//        Meteor.call('methodName1');

        // on data event
        socket.on('data-event', Meteor.bindEnvironment(function(data) {
//            console.log(data);
//            Meteor.call('methodName2');
        }, function(e) {
            throw e;
        }));

        // on disconnect
        socket.on('disconnect', Meteor.bindEnvironment(function() {
            console.log('Disconnected from the websocket!');
//            Meteor.call('methodName3');
        }, function(e) {
            throw e;
        }));

    }, function(e) {
        throw e;
    }));
});