require 'test_helper'

class UrlsControllerTest < ActionController::TestCase
  setup do
    @url = urls(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:urls)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create url" do
    assert_difference('Url.count') do
      post :create, url: { hash_val: @url.hash_val, link: @url.link }
    end

    assert_redirected_to url_path(assigns(:url))
  end

  test "should show url" do
    get :show, hash_index: @url
    assert_response :success
  end

  test "should get edit" do
    get :edit, hash_index: @url
    assert_response :success
  end

  test "should update url" do
    patch :update, hash_index: @url, url: { hash_val: @url.hash_val, link: @url.link }
    assert_redirected_to url_path(assigns(:url))
  end

  test "should destroy url" do
    assert_difference('Url.count', -1) do
      delete :destroy, hash_index: @url
    end

    assert_redirected_to urls_path
  end
end
