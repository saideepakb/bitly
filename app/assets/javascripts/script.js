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
    tagName: 'tr',
    events: {
      'click #destroy': 'destroy'
    },
    initialize: function(){
    _.bindAll(this, 'render', 'destroy'); // every function that uses 'this' as the current object should be in here
    },
    render: function(){
					console.log("B");
          var originalUrl = '<th>' + this.model.get('link') + '</th>';
          var shortUrl = '<th>' + '<a id="link" href="http://localhost:3000/r/' + this.model.get('hash_val')+'" role="button" class="btn btn-success">Link</a>' + '</th>';
          var clickCount = '<th>' + '<a href="#" id="destroy" role="button" class="btn btn-warning">Destroy</a>' + '</th>';
          $(this.el).html( originalUrl + shortUrl + clickCount );
          return this;
    },
    destroy: function(){
      var response = window.confirm("Are you sure you want to delete " + this.model.get('link'));
      if(response == true){
          this.model.destroy({
            success: function(model, response){
              window.alert('Model successfully deleted');
            }
          });
      } else{
        return false;
      }
    }
  });

	var AppView = Backbone.View.extend({
    el: $('.container'), // el attaches to existing element
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
      $('table', this.el).append(itemView.render().el);
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
