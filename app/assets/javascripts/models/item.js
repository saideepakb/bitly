var app = app || {};

(function () {
  app.Item  = Backbone.Model.extend({
    defaults: {
      link: '',
      click_count: 0,
      hash_val: ''
    },
		urlRoot: 'http://localhost:3000/urls'
  });
})();
