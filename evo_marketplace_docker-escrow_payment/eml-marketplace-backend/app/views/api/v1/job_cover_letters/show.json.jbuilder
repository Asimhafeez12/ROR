if @job_cover_letter
	json.extract! @job_cover_letter, :id, :cover_letter, :expected_timeline, :expected_amount
end


