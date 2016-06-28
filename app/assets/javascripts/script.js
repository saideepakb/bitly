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
          console.log(this.model);
          var originalUrl = '<td>' + this.model.get('link') + '</td>';
          var shortUrl = '<td id="link">http://localhost:3000/r/' + this.model.get('hash_val') +'</td>';
          var clickCount = '<td>' + this.model.get('click_count') + '</td>';
          var destroyUrl = '<td>' + '<a href="#" id="destroy" role="button" class="btn btn-warning">Destroy</a>' + '</td>';
          $(this.el).html( originalUrl + shortUrl + clickCount + destroyUrl);
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
			this.collection.fetch({
        success: function () {
            that.render();
        }
      });
    },

    render: function(){
      var self = this;
     _(this.collection.models).each(function(item){
       self.appendItem(item);
     }, this);
    },
    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      $("tr").eq(0).after(itemView.render().el);
    },
		processKey: function(e) {
		  if(e.which === 13){
				var newUrl = $('input').val();
				if(newUrl != ''){
					var urlModel = new Item();
					var urlDetails = {link: newUrl};
					urlModel.save(urlDetails, {
						success: function (item) {
              var itemView = new ItemView({
                model: item
              });
              $("tr").eq(0).after(itemView.render().el);
              $("tr").eq(1).addClass("success");
              $("input").val("");
						}
					});
				}
			}
		}
	});

	var appView = new AppView();

});
