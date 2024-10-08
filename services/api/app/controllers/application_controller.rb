class ApplicationController < ActionController::API
  attr_accessor :current_user

  before_action :set_user!
  rescue_from ::Exceptions::GenericError, with: :rescue_genric_error

  private

  def set_user!
    token = request.headers['X-Session-Token']
    return unless token.present?

    token = ::JwtAuth.validate_token(token)
    return unless token.present?

    @current_user ||= User.find_by(id: token[:id])
  end

  def authenticate_user!
    head :forbidden and return if current_user.blank?
  end

  def set_session_header!(user)
    token = ::JwtAuth.issue_token(user)
    response.headers['X-Session-Token'] = token
  end

  def invalidate_user_cookie!
    response.headers['X-Session-Token'] = nil
  end

  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def handle_error(error, status_code = :unprocessable_entity)
    json_response({ error: error }, status_code)
  end

  def rescue_genric_error(error)
    handle_error(error.message, error.status_code)
  end
end
