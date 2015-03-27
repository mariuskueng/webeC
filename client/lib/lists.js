Meteor.subscribe('Lists');

Template.listsView.onRendered(function() {
  var controller = Iron.controller();
  var params = controller.getParams();
  Meteor.call('setCurrentList', params._id);
});

Template.listsView.helpers({
  myAppVariable: function () {
    return Session.get('myAppVariable');
  },
  user: function() {
    return Meteor.user();
  },
  lists: function() {
    return Lists.find({createdBy: Meteor.userId()}, {sort:{createdAt: -1}});
  },
  isCurrentList: function (listId) {
    var controller = Iron.controller();
    var params = controller.getParams();
    if (listId == params._id) {
      return true;
    }
    return false;
  }
});
Template.addListView.events({
  'submit .add-list': function (event, template) {
    // This function is called when the new item form is submitted
    var text = event.target.text.value;
    Meteor.call("addList", text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
});
