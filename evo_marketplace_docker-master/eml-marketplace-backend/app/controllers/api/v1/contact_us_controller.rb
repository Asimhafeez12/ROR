class Api::V1::ContactUsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    MyMailer.contact_us(params[:contact_us][:full_name], params[:contact_us][:email], params[:contact_us][:message]).deliver_later
  end

end
