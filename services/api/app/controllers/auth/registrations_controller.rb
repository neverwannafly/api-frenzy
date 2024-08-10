class Auth::RegistrationsController < ::ApplicationController
  before_action :verify_user, only: %i[create]

  include ::Auth::Exceptions

  def create
    user = User.new(user_params)
    handle_error(user.errors) and return unless user.save

    set_session_header!(user)

    json_response(::UserSerializer.new(user))
  end

  private

  def user_params
    params.require(:registration).permit(:email, :username, :password, :password_confirmation)
  end

  def verify_user
    raise UserAlreadyLoggedInError, :bad_request if @current_user.present?
  end
end
