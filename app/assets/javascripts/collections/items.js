var app = app || {};

(function () {
  var Items = Backbone.Collection.extend({
    model: app.Item,
    url: '/urls'
  });
  app.items = new Items();
})();
