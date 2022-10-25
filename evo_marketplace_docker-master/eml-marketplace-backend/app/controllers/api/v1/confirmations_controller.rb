class Api::V1::ConfirmationsController < Devise::ConfirmationsController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def create
    current_user.update(resend_confirmation: true) if current_user.present?
    # self.resource = resource_class.send_confirmation_instructions(resource_params)
    self.resource = resource_class.send_confirmation_instructions({email: current_user.email}) if current_user.present?
    if resource.present?
      if successfully_sent?(resource)
        Notification.create(recipient_id: current_user.id, action: "notifications.user.confirmed")
        respond_with({}, :location => after_resending_confirmation_instructions_path_for(resource_name))
      else
        respond_with(resource)
      end
    end
  end


  private

  def after_confirmation_path_for(resource_name, resource)
  	"/email_confirmation"
  end

end
