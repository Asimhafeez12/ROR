if @job_cover_letter.errors.any?
  json.errors @job_cover_letter.errors
else
  json.extract! @job_cover_letter, :id
end

