json.array! @invited_freelancers.each_with_index do |af, index|
	json.id(af.id)
	json.user_full_name(af.user_full_name)
	json.user_email(af.user_email)
	json.referred_by_admin(af.referred_by_admin)
	#json.current_chatroom_id(af.current_chatroom_id)
	json.user_id(af.user_id)
	json.job_id(af.job_id)
	json.user_skill_list(af.user_skill_list)
	json.user_expertise_list(af.user_expertise_list)
	json.job_cover_letter get_cover_letter(af.user_id, @job.id)
    @job.job_cover_letters.each do |jcl|
    	if jcl.user_id == af.id   
    		json.freelancer_cover_letter_cover_letter jcl.cover_letter 
    		json.freelancer_cover_letter_expected_amount jcl.expected_amount  
    		json.freelancer_cover_letter_expected_timeline jcl.expected_timeline                                                                                                                           
		end                                                   
	end
end

