class Auth::SessionsController < ::ApplicationController
  before_action :authenticate_user!, only: %i[destroy]
  before_action :verify_user, only: %i[create]

  include ::Auth::Exceptions

  def create
    set_session_header!(@user)

    json_response(::UserSerializer.new(@user))
  end

  def destroy
    invalidate_user_cookie!

    head :ok
  end

  private

  def verify_user
    raise UserAlreadyLoggedInError, :bad_request if @current_user.present?

    @user = User.find_by_username(params[:username])

    if @user.blank? || !@user.authenticate(params[:password])
      raise InvalidLoginCredentialsError, :unauthorized
    end
  end
end
