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

}

if(Meteor.isServer) {
  Channel.allow({
    insert() { return false },
    update() { return false },
    remove() { return false }
  })
}
