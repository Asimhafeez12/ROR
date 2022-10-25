if @job.errors.any?
  json.errors @job.errors
else
  json.array! @job.opted_freelancers, :id, :user_full_name, :user_email, :user_id
end
