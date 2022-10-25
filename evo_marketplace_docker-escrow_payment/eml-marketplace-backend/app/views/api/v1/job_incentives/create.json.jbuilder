if @job_incentive.errors.any?
  json.errors @job_incentive.errors
else
  json.extract! @job_incentive, :id
end

