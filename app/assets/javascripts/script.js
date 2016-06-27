(function ($) {
  var Item = Backbone.Model.extend({
    defaults: {
      link: 'http://google.com',
      hash_val: '0',
      count: 1
    }
  });

	var List = Backbone.Collection.extend({
    model: Item,
     url: 'http://localhost:3000/b/urls'
  });

	var ItemView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
    _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
    },
    render: function(){
					console.log("B");
          $(this.el).html('<span>'+this.model.get('link')+' '+this.model.get('hash_val')+'</span>');
          return this; // for chainable calls, like .render().el
        }
  });

	var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element
    events: {
      'click button#add': 'addItem'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'appendItem');
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
    }
	});
	 var listView = new ListView();
})(jQuery);
