json.array!(@urls) do |url|
  json.extract! url, :id, :link, :hash_val, :click_count, :created_at
  json.url url_url(url, format: :json)
end
