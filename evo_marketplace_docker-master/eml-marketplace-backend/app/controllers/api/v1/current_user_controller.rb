class Api::V1::CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: { user: current_user }
  end
end
