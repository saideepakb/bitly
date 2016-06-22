json.array!(@urls) do |url|
  json.extract! url, :id, :link, :hash_val
  json.url url_url(url, format: :json)
end
