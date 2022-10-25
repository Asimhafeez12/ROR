class Api::V1::FreelancerEditProfilesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :update_profile_score_for_title, only: [:create]
    before_action :update_profile_score_for_summary, only: [:create]
    before_action :update_profile_score_for_avatar, only: [:create]
    before_action :update_profile_score_for_skills, only: [:create]
    before_action :update_profile_score_for_languages, only: [:create]
  
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

    def update_profile_score_for_title
      if (current_user.title == "" || current_user.title.nil?) && params[:user][:title].present? && params[:user][:title] != ""
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score + 10;
        current_user.update(profile_score: @current_user_score)
      elsif current_user.title.present? && params[:user][:title].present? && params[:user][:title].empty?
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score - 10;
        current_user.update(profile_score: @current_user_score)
      end
    end

    def update_profile_score_for_summary
      if (current_user.summary == "" || current_user.summary.nil?) && params[:user][:summary].present? && params[:user][:summary] != ""
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score + 10;
        current_user.update(profile_score: @current_user_score)
      elsif current_user.summary.present? && params[:user][:summary].present? && params[:user][:summary].empty?
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score - 10;
        current_user.update(profile_score: @current_user_score)
      end
    end

    def update_profile_score_for_avatar
      if current_user._r.include?("freelancer") && (current_user.avatar_url.nil?) && params[:user][:avatar].present? && params[:user][:avatar] != ""
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score + 10;
        current_user.update(profile_score: @current_user_score)
      end
    end

    def update_profile_score_for_skills
      if (current_user.skill_list.count == 0) && params[:user][:skill_list].present?
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score + 10;
        current_user.update(profile_score: @current_user_score)
      elsif (current_user.skill_list.count > 0) && params[:user][:skill_list].try(:empty?)
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score - 10;
        current_user.update(profile_score: @current_user_score)
      end
    end

    def update_profile_score_for_languages
      if (current_user.language_list.count == 0) && params[:user][:language_list].present?
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score + 10;
        current_user.update(profile_score: @current_user_score)
      elsif (current_user.language_list.count > 0) && params[:user][:language_list].try(:empty?)
        @current_user_score = current_user.profile_score
        @current_user_score = @current_user_score - 10;
        current_user.update(profile_score: @current_user_score)
      end
    end

  end
  