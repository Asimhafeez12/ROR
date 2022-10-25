require "#{Rails.root}/app/helpers/application_helper"
include ApplicationHelper
desc "clear_session_for_active_users"
task clear_session_for_active_users: :environment do
	User.all.each do |user|
		user.update_attributes(sign_in_count: 0, current_sign_in_at: "", last_sign_in_at: "", current_sign_in_ip: "", last_sign_in_ip: "")
	end
end


