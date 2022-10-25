class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_authenticity_token
=begin
  def create
    super { @token = current_token }
  end
  private
  def current_token
    request.env['warden-jwt_auth.token']
  end
=end
end
