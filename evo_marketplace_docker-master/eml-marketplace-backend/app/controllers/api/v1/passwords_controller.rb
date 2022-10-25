class Api::V1::PasswordsController < Devise::PasswordsController
  respond_to :json
  skip_before_action :verify_authenticity_token

	protected 

	def after_sending_reset_password_instructions_path_for(resource_name)
	  "/reset_password_email_sent"
	end

end
