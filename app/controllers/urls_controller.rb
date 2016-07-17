require 'uri'
require 'net/ping'
require "#{Rails.root}/lib/assets/hash_methods"

class UrlsController < ApplicationController
  before_action :set_url, only: [:show, :edit, :update, :destroy]

  # GET /urls
  # GET /urls.json
  def index
    @urls = Url.where("is_deleted = false")
  end

  # GET /urls/1
  # GET /urls/1.json
  def show
  end

  # GET /urls/r/001
  def r
    hash_val = params[:hash_val]
    id = Hash.create_id_from_hash(hash_val)

    @url = Url.find(id)
    puts "---------------------"
    puts @url
    if @url == nil || @url.is_deleted == t
      format.html { render :index }
      format.json { render json: @url.errors, status: :unprocessable_entity }
    else
      @url.click_count = @url.click_count + 1
      @url.save
      redirect_to @url.link
    end
  end

  # GET /urls/new
  def new
    @url = Url.new
  end

  # POST /urls
  # POST /urls.json
  def create
    @url = Url.new(url_params)
    @url.click_count = 0;
    @url.is_deleted = false
    result = Url.last
    prev_id = 0;
    if result != nil
      prev_id = result.id
    end
    @url.id = prev_id + 1
    @url.hash_val = Hash.create_hash_from_id(@url.id)
    respond_to do |format|
      if valid_url?(@url.link) == false
        format.html { render :new }
        format.json { render json: @url.errors, status: :unprocessable_entity }
      elsif @url.save
        format.html { redirect_to @url, notice: 'Url was successfully created.' }
        format.json { render :show, status: :created, location: @url }
      else
        format.html { render :new }
        format.json { render json: @url.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /urls/1
  # DELETE /urls/1.json
  def destroy
    @url.is_deleted = true
    @url.save
    respond_to do |format|
      format.html { redirect_to urls_url, notice: 'Url was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_url
      @url = Url.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def url_params
      params.require(:url).permit(:link)
    end

    def valid_url?(uri)
      uri = uri.strip
      if uri == "" || uri !~ /\A#{URI::regexp(['http', 'https'])}\z/
        return false
      end
      uri = URI.parse(uri)
      check = Net::Ping::External.new(uri.host)
      check.ping?
    rescue URI::InvalidURIError
      false
    end
end
