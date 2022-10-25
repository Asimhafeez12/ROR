class Api::V1::EscrowCallbacksController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    render json: { success: EscrowCallback.new(permitted_params).commit! }
  end
  private
  def permitted_params
    params.require(:escrow_callback).permit(:event_type, :transaction_id, :event, :reference)
  end
end
