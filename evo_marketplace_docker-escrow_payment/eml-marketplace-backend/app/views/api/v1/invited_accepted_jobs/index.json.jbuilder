json.array! @jobs_invitations.each_with_index do |job, index|
	json.id(job.id)
	json.title(job.title)
	json.description(job.description)
	json.is_approved(job.is_approved)
	json.created_at(job.created_at)
	json.minimum_budget(job.minimum_budget)
	json.invited_freelancers_count(job.invited_freelancers_count)
	json.created_at_format(job.created_at_format)
	json.accept_freelancers_count(job.accept_freelancers_count)
	json.skill_list(job.skill_list)
	json.job_category_avatar_url(job.job_category_avatar_url)
	json.user_full_name(job.user_full_name)
	json.open_milestones_count(job.open_milestones_count)
	json.amount_paid_for_completed_milestones(job.amount_paid_for_completed_milestones)
	json.amount_remaining_for_open_milestones(job.amount_remaining_for_open_milestones)
	json.accepted_freelancer_id(job.accepted_freelancer_id)
	json.accepted_freelancer_ids(job.accepted_freelancer_ids)
	json.state (job.state)
  if job.invited_freelancers_list.any?
	  json.invited_freelancers_list job.invited_freelancers_list.each_with_index do |user, index|
	  	json.user_id(user.id)
	  	json.user_full_name(user.full_name)
	  	json.user_title(user.title)
	  	json.user_avatar_url(user.avatar_url)
	  	json.user_skill_list(user.skill_list)
	  	json.user_expertise_list(user.expertise_list)
	  	json.current_chatroom_id current_chatroom_id(user, current_user, job).id if current_chatroom_id(user, current_user, job) != false
	  end
  end
  if job.accept_freelancers_list.any?
	  json.accept_freelancers_list job.accept_freelancers_list.each_with_index do |user, index|
	  	json.user_id(user.id)
	  	json.user_full_name(user.full_name)
	  	json.user_title(user.title)
	  	json.user_avatar_url(user.avatar_url)
	  	json.user_skill_list(user.skill_list)
	  	json.user_expertise_list(user.expertise_list)
	  	json.current_chatroom_id current_chatroom_id(user, current_user, job).id if current_chatroom_id(user, current_user, job) != false
		json.job_cover_letter get_cover_letter(user.id, job.id)
	  end
  end

end
