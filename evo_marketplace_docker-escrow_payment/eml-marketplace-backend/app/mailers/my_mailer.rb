class MyMailer < Devise::Mailer   
  default :from => 'no-reply@evolvemachinelearners.com'
  helper :application # gives access to all helpers defined within `application_helper`.
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`
  default template_path: 'users/mailer' # to make sure that your mailer uses the devise views

  def confirmation_instructions(record, token, opts={})
    super
  end

  # Overrides same inside Devise::Mailer
  def reset_password_instructions(record, token, opts={})
    super
  end

  # Overrides same inside Devise::Mailer
  def unlock_instructions(record, token, opts={})
    super
  end

end