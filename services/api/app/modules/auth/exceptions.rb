module Auth::Exceptions
  INVALID_LOGIN_CREDENTIALS_ERROR = "Email Password combination is incorrect"
  USER_AlREADY_LOGGED_IN_ERROR = "You're already logged in"

  include ::Exceptions
end
