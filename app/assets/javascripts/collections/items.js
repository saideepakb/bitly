var app = app || {};

(function () {
  var Items = Backbone.Collection.extend({
    model: app.Item,
    url: 'http://localhost:3000/urls'
  });
  app.items = new Items();
})();
