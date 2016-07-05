var app = app || {};
(function ($) {
  app.AppView = Backbone.View.extend({
    el: '.container', // el attaches to existing element
    events: {
      'keyup #urlInput': 'processKey'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'appendItem');
      this.collection = app.items;
      var that = this;
      this.collection.fetch({
        success: function () {
            that.render();
        }
      });
    },
    render: function(){
      var self = this;
     _(this.collection.models).each(function(item) {
       self.appendItem(item);
     }, this);
    },
    appendItem: function(item){
      var itemView = new app.ItemView({
        model: item
      });
      $("tr").eq(0).after(itemView.render().el);
    },
    processKey: function(e) {
      if(e.which === 13){
        var newUrl = $('input').val();
        if(newUrl != ''){
          var urlModel = new app.Item();
          var urlDetails = {link: newUrl};

          urlModel.save(urlDetails, {
            success: function (item) {
              var itemView = new app.ItemView({
                model: item
              });
              $("tr").eq(0).after(itemView.render().el);
              $("tr").eq(1).fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
              if($(".form-group").hasClass("has-warning")){
                $(".form-group").removeClass("has-warning");
              }
              $("input").val("");
              return false;
            },
            error: function (error){
              if(!$(".form-group").hasClass("has-warning")){
                $(".form-group").addClass("has-warning");
              }
              return false;
            }
          });

        }
      }
    }
  });
})(jQuery);
