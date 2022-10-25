require "#{Rails.root}/app/helpers/application_helper"
include ApplicationHelper
desc "update_profile_score_for_existing_users"
task update_profile_score_for_existing_users: :environment do
	User.all.each do |user|
		if user._r.include?('freelancer')
			@score = 10;
			if user.title.present? && user.title != ""
				@score = @score + 10;
			end
			if user.summary.present? && user.summary != ""
				@score = @score + 10;
			end
			if user.avatar_url.present? && user.avatar_url != ""
				@score = @score + 10;
			end
			if user.skill_list.count > 0
				@score = @score + 10;
			end
			if user.language_list.count > 0
				@score = @score + 10;
			end
			if user.user_experiences.count > 0
				@score = @score + 10;
			end
			if user.user_portfolios.count > 0
				@score = @score + 10;
			end
			if user.user_educations.count > 0
				@score = @score + 10;
			end
			if user.user_certificates.count > 0
				@score = @score + 10;
			end
			user.update(profile_score: @score);
		end
	end
end


