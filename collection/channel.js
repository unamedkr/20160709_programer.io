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
    return Channel.find(query, {sort: {createdAt: -1}, limit: 50});
  })

}

if(Meteor.isServer) {
  Channel.allow({
    insert() { return true },
    update() { return true },
    remove() { return false }
  })
}
