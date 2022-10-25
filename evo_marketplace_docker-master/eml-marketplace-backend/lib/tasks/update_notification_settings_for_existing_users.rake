require "#{Rails.root}/app/helpers/application_helper"
include ApplicationHelper
desc "update_notification_settings_for_existing_users"
task update_notification_settings_for_existing_users: :environment do
	User.all.each do |user|
		user.update(:job_posted => true, :job_posted_email => true, :job_approved => true, :job_approved_email => true, :cover_letter_received => true, :cover_letter_received_email => true, :job_offer_sent => true, :job_offer_sent_email => true, :job_offer_accepted => true, :job_offer_accepted_email => true, :job_offer_rejected => true, :job_offer_rejected_email => true, :milestone_created => true, :milestone_created_email => true, :milestone_accepted => true, :milestone_accepted_email => true, :milestone_agreed_by_freelancer => true, :milestone_agreed_by_freelancer_email => true, :milestone_accepted_on_escrow => true, :milestone_accepted_on_escrow_email => true, :milestone_delivered => true, :milestone_delivered_email => true, :milestone_received => true, :milestone_received_email => true, :payment_approved => true, :payment_approved_email => true, :invitation_received => true, :invitation_received_email => true, :cover_letter_submitted => true, :cover_letter_submitted_email => true, :job_offer_received => true, :job_offer_received_email => true, :job_started => true, :job_started_email => true, :job_closed => true, :job_closed_email => true, :rating_given => true, :rating_given_email => true, :rating_received => true, :rating_received_email => true)
		user.update(:unread_messages_interval => "15")
	end
end


