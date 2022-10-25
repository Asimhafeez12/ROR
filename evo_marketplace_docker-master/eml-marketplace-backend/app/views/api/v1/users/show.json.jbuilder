json.id @user.id
json.title @user.title
json.summary @user.summary
json.full_name @user.full_name
json.first_name @user.first_name
json.last_name @user.last_name
json.avatar_url @user.avatar_url
json.user_role @user._r
json.expertise_list_count @user.expertise_list_count
json.job_cover_letters @user.job_cover_letters
json.job_count @user.jobs.count
json.skill_list_count @user.skill_list.count
json.total_job_count_for_freelancer @user.total_job_count_for_freelancer
json.city @user.city
json.country @user.country
json.phone_number @user.phone_number
json.average_job_rating_for_all_jobs @user.average_job_rating_for_all_jobs
json.escrow_knowledge @user.escrow_knowledge
json.freelancers_hired_count @user.freelancers_hired_count
json.total_amount_spent @user.total_amount_spent
json.profile_score @user.profile_score
json.education_count @user.user_educations.count
json.experience_count @user.user_experiences.count
json.portfolio_count @user.user_portfolios.count
json.certificate_count @user.user_certificates.count
json.language_count @user.language_list.count
#json.current_chatroom_id current_chatroom_id(@user, current_user)
