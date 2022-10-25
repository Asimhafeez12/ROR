if @job_rating
	if @job_rating.errors.any?
	  json.errors @job_rating.errors
	else
	  json.extract! @job_rating, :id, :communication, :accuracy, :quality, :value, :deadline, :availability, :overall_rating, :review, :rounded_overall_rating
	end
end

