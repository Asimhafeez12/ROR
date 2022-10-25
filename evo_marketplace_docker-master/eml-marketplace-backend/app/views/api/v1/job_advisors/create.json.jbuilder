if @job_advisor.errors.any?
  json.errors @job_advisor.errors
else
  json.extract! @job_advisor, :id
end

