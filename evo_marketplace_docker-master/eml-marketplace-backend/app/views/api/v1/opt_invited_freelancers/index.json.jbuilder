json.array! @opted_freelancers.each_with_index do |af, index|
	json.id(af.id)
	json.user_full_name(af.user_full_name)
	json.user_email(af.user_email)
	json.user_id(af.user_id)
	json.user_badge_list(af.user_badges)
end
