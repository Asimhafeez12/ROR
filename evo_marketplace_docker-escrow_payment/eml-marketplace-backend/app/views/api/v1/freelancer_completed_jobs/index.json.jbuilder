json.array! @completed_jobs.each_with_index do |job, index|
	json.id(job.id)
	json.title(job.title)
	json.description(job.description)
	json.is_approved(job.is_approved)
	json.created_at(job.created_at)
	json.minimum_budget(job.minimum_budget)
	json.created_at_format(job.created_at_format)
	json.skill_list(job.skill_list)
	json.job_category(job.job_category)
	json.job_category_avatar_url(job.job_category_avatar_url)
	json.user_id(job.user_id)
	json.user_full_name(job.user_full_name)
	json.user_avatar_url(job.user_avatar_url)
	json.user_country(job.user_country)
	json.job_client_payment_status(job.job_client_payment_status)
	json.open_milestones_count(job.open_milestones_count)
	json.amount_paid_for_completed_milestones(job.amount_paid_for_completed_milestones)
	json.amount_remaining_for_open_milestones(job.amount_remaining_for_open_milestones)
	json.accepted_freelancer_id(job.accepted_freelancer_id)
	  if job.all_job_ratings_for_freelancer.any?
		  json.all_job_ratings_for_freelancer job.all_job_ratings_for_freelancer.each_with_index do |job_rating, index|
		  	json.accuracy(job_rating.accuracy)
		  	json.communication(job_rating.communication)
		  	json.quality(job_rating.quality)
		  	json.value(job_rating.value)
		  	json.deadline(job_rating.deadline)
		  	json.availability(job_rating.availability)
		  	json.overall_rating(job_rating.overall_rating)
		  	json.review(job_rating.review)
		  end
	  end
end