# Bitly
A URL shortener based on https://bitly.com/. The application was built using Ruby on Rails and Backbone.js.

# Features
* Single Page Application using Backbone.js. Inspired by https://github.com/jmbejar/todo-rails-api-backbone-frontend
* Uses a custom hashing algorithm to uniquely identify URLs
* Very fast lookups using a hash reversal algorithm corresponding to the id of the table where the hashes are stored
* Counts the number of times a URL hash is accessed
* Uses Bootstrap for styling
