/********************************************
* schema
*********************************************


*********************************************/
Channel = new Mongo.Collection('channel');


if(Meteor.isServer) {
  Meteor.publish('channels', () => {
    return Channel.find()
  })

  Meteor.publish('users', () => {
    return Channel.find({type: 'USER'})
  })

  Meteor.publish('findMainPosts', (query) => {
    return Channel.find(query, {sort: {createdAt: -1}, limit: 50});
  })

  Meteor.publish('findMainSpots', (query) => {
    return Channel.find(query, {sort: {createdAt: -1}, limit: 50});
  })
}

if(Meteor.isServer) {
  Channel.allow({
    insert() { return false },
    update() { return false },
    remove() { return false }
  })
}
