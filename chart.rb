require 'net/http'
require 'json'

params = {
  :access_key => "d605eebcea19b7f8a03fda27c700d6f4"
}
uri = URI('http://api.marketstack.com/v1/tickers/PTT.XBKK/eod')
uri.query = URI.encode_www_form(params)
json = Net::HTTP.get(uri)
api_response = JSON.parse(json)

puts api_response.to_s.gsub('=>', ':').gsub('nil', '""')

