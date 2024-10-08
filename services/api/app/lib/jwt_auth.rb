class JwtAuth
  TOKEN_ISSUER = "api-frenzy".freeze

  def self.issue_token(user, expiry_in_hours = 72.hours)
    exp = (Time.now.to_i + expiry_in_hours).to_i
    iss = issuer
    id = user.id

    payload = {
      iss: iss,
      exp: exp,
      id: id,
    }

    token = JWT.encode(payload, secret_key, 'HS256')

    "Bearer #{token}"
  end

  def self.validate_token(token)
    unless token.present?
      return nil
    end

    begin
      token.gsub!('Bearer ','')
      decoded_token = JWT.decode(
        token,
        secret_key,
        true,
        { verify_iss: true, iss: issuer, algorithm: 'HS256' }
      )

      return decoded_token[0].symbolize_keys
    rescue JWT::DecodeError => e
      Rails.logger.warn "Error decoding the JWT: "+ e.to_s
    end
    
    nil
  end

  private

  def self.secret_key
    Rails.application.secret_key_base
  end

  def self.issuer
    TOKEN_ISSUER
  end
end
