if @job.errors.any?
  json.errors @job.errors
else
  json.array! @job.accept_freelancers, :id, :user_full_name, :user_email, :user_id
end
