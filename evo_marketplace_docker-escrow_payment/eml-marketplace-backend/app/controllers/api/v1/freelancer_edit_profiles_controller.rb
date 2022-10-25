class Api::V1::FreelancerEditProfilesController < ApplicationController
    skip_before_action :verify_authenticity_token
  
    def create
      (@user = current_user).update(permitted_params)
    end

  	private
	  def user
	    @user = current_user.id
	  end
    
    protected
    def permitted_params
      params.require(:user).permit(:phone_number, :country, :avatar, :is_not_active, :deactivation_reason, :security_question, :security_answer, :first_name, :last_name, :escrow_knowledge, :city, :title, :summary, :skill_list, :language_list)
    end
  end
  