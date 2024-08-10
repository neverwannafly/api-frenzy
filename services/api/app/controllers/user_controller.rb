class UserController < ApplicationController
  before_action :authenticate_user!

  def index
    json_response(::UserSerializer.new(@current_user))
  end
end
