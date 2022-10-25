if @job
	if @job.errors.any?
	  json.errors @job.errors
	else
	  json.extract! @job, :title, :description, :minimum_budget, :id
	end
end
