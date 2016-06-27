$(document).ready(
function ($) {
  var Item = Backbone.Model.extend({
    defaults: {
      link: ''
    },
		urlRoot: 'http://localhost:3000/urls'
  });

	var List = Backbone.Collection.extend({
		model: Item,
		url: 'http://localhost:3000/urls'
  });

	var ItemView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
    _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
    },
    render: function(){
					console.log("B");
          $(this.el).html('<span>'+this.model.get('link')+'     '+this.model.get('hash_val')+'</span>');
          return this;
    }
  });

	var AppView = Backbone.View.extend({
    el: $('#app'), // el attaches to existing element
		events: {
  		'keyup #urlInput': 'processKey'
		},
    initialize: function () {
      _.bindAll(this, 'render', 'appendItem','processKey');
			this.collection = new List();
			var that = this;
			console.log(this);
			this.collection.fetch({
        success: function () {
            that.render();
        }
      });
    },

    render: function(){
      var self = this;
			console.log(_(this.collection.models));
     _(this.collection.models).each(function(item){
			 console.log("A");
       self.appendItem(item);
     }, this);
    },
    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    },
		processKey: function(e) {

		  if(e.which === 13){
				var newUrl = $('input').val();
				if(newUrl != ''){
					console.log(newUrl);
					var urlModel = new Item();
					var urlDetails = {link: newUrl};
					urlModel.save(urlDetails, {
						success: function (url) {
							alert(JSON.stringify(url));
						}
					});
				}
			}
		}
	});

	var appView = new AppView();

});
