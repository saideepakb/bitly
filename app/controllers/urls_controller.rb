require 'uri'
require 'net/ping'
require "#{Rails.root}/lib/tasks/hash"

class UrlsController < ApplicationController
  before_action :set_url, only: [:show, :edit, :update, :destroy]

  # GET /urls
  # GET /urls.json
  def index
    @urls = Url.all
  end

  # GET /b
  def index_backbone
  end

  # GET /b/urls
  # GET /b/urls.json
  def get_backbone
    @urls = Url.all
    render json: @urls
  end

  # GET /urls/1
  # GET /urls/1.json
  def show
  end

  # GET /urls/r/001
  def r
    hash_val = params[:hash_val]
    @url = Url.where(hash_val: hash_val).take
    if @url == nil
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

  # GET /urls/1/edit
  def edit
  end

  # POST /urls
  # POST /urls.json
  def create
    @url = Url.new(url_params)
    @url.click_count = 0;
    result = Url.last
    seed_str = "0";
    if result != nil
      seed_str = result.hash_val
    end
    @url.hash_val = Hash.create_new_hash(seed_str)
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

  # PATCH/PUT /urls/1
  # PATCH/PUT /urls/1.json
  def update
    respond_to do |format|
      if @url.update(url_params)
        format.html { redirect_to @url, notice: 'Url was successfully updated.' }
        format.json { render :show, status: :ok, location: @url }
      else
        format.html { render :edit }
        format.json { render json: @url.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /urls/1
  # DELETE /urls/1.json
  def destroy
    @url.destroy
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
