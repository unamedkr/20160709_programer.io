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

}

if(Meteor.isServer) {
  Channel.allow({
    insert() { return true },
    update() { return false },
    remove() { return false }
  })
}
