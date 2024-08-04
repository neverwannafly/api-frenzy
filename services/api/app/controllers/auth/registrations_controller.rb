class Auth::RegistrationsController < ::ApplicationController
  def create
    user = User.new(user_params)
    handle_error(user.errors) and return unless user.save

    set_user_cookie!(user)

    json_response(::UserSerializer.new(user))
  end

  private

  def user_params
    params.require(:registration).permit(:email, :username, :password, :password_confirmation)
  end
end
