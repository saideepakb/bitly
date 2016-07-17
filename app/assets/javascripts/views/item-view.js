var app = app || {};

(function () {
  app.ItemView = Backbone.View.extend({
    tagName: 'tr',
    events: {
      'click #destroy': 'destroy'
    },
    initialize: function(){
    _.bindAll(this, 'render', 'destroy'); // every function that uses 'this' as the current object should be in here
    },
    render: function(){
          var originalUrl = '<td>' + this.model.get('link') + '</td>';
          var shortUrl = '<td id="link">' + window.location.hostname + '/r/' + this.model.get('hash_val') +'</td>';
          var clickCount = '<td>' + this.model.get('click_count') + '</td>';
          var createdAt = '<td>' + this.model.get('created_at') + '</td>';
          var destroyUrl = '<td>' + '<a href="#" id="destroy" role="button" class="btn btn-warning">Destroy</a>' + '</td>';
          var id = this.model.get('id').toString();
          $(this.el).attr("id", id)
          $(this.el).html(originalUrl + shortUrl + clickCount + createdAt.slice(0, 14) + destroyUrl);
          return this;
    },
    destroy: function(){
      var response = window.confirm("Are you sure you want to delete " + this.model.get('link') + "?");
      if(response == true){
          this.model.destroy({
            success: function(model, response){
              var id = model.get("id").toString();
              $('#' + id).remove();
            }
          });
      } else{
        return false;
      }
    }
  });
})();
