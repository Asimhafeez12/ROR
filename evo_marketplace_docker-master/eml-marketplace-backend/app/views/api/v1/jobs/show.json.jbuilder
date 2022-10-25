json.id @job.id
json.title @job.title
json.description @job.description
json.created_at @job.created_at
json.minimum_budget @job.minimum_budget
json.user_id @job.user_id
json.state  @job.state
json.user_full_name @job.user_full_name
json.user_email @job.user_email
json.cvpm @job.can_view_project_milestone?(current_user)
json.is_approved @job.is_approved?
json.invited_freelancers_count @job.invited_freelancers.count
json.accepted_freelancers_count @job.accepted_freelancers.count
json.job_category @job.job_category
json.created_at_format @job.created_at_format
json.starting_date @job.converted_starting_date
json.deadline @job.deadline
json.duration @job.duration
json.availability @job.availability
json.additional_info @job.additional_info
json.desired_profile @job.desired_profile
json.skill_list @job.skill_list
json.job_category_avatar_url @job.job_category_avatar_url
json.translated_duration @job.translated_duration
json.translated_availability @job.translated_availability
json.translated_desired_profile @job.translated_desired_profile
json.open_milestones_count @job.open_milestones_count
json.milestones_count @job.milestones_count
json.amount_paid_for_completed_milestones @job.amount_paid_for_completed_milestones
json.amount_remaining_for_open_milestones @job.amount_remaining_for_open_milestones
json.accepted_freelancer_id @job.accepted_freelancer_id
json.accepted_freelancer_ids @job.accepted_freelancer_ids
json.job_cover_letter_ids @job.job_cover_letter_ids
json.average_job_rating_for_all_jobs_for_job_client @job.average_job_rating_for_all_jobs_for_job_client
json.get_rejected_freelancer get_rejected_freelancer(@job.id)
json.closing_date(@job.closing_date)
json.first_freelancer_hired_on(@job.first_freelancer_hired_on)
json.job_files(@job.job_files)
json.job_cover_letter_count(@job.job_cover_letter_count)
json.job_cover_letter get_cover_letter(current_user.id, @job.id)
json.job_client do
	json.extract! @job.job_client, :id, :full_name, :jobs_count, :country, :freelancers_hired_count, :member_since, :avatar_url, :total_amount_spent
end

if @job.accept_freelancers_list.any?
  json.accept_freelancers_list @job.accept_freelancers_list.each_with_index do |user, index|
  	json.user_id(user.id)
  	json.user_full_name(user.full_name)
  	json.user_title(user.title)
  	json.user_avatar_url(user.avatar_url)
  	json.user_badge_list(user.badges)
  end
end