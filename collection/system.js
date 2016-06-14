/********************************************
* schema
*********************************************


*********************************************/
Meta = new Mongo.Collection('system');


if(Meteor.isServer) {
  Meteor.publish('system', () => {
    return Meta.find()
  })
}

if(Meteor.isServer) {
  Meta.allow({
    insert() { return true },
    update() { return true },
    remove() { return true }
  })
}
