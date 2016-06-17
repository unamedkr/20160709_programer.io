/********************************************
* schema
*********************************************


*********************************************/
Channel = new Mongo.Collection('channel');


if(Meteor.isServer) {
  Meteor.publish('channels', () => {
    return Channel.find({}, {sort: {createdAt: -1}})
  })

  Meteor.publish('users', () => {
    return Channel.find({type: 'USER'})
  })

  Meteor.publish('findMainPosts', (query) => {
    query.keywords = 'programer';
    query.type = 'POST'
    query.parent = { $ne : null }
    return Channel.find(query, {sort: {createdAt: -1}, limit: 10});
  })
}

if(Meteor.isServer) {
  Channel.allow({
    insert() { return true },
    update() { return true },
    remove() { return false }
  })
}
