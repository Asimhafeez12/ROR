class CreateJobSkillJoinTable < ActiveRecord::Migration[5.1]
	def change
	  create_table :job_skills do |t|
	    t.references :job, index: true
	    t.references :skill, index: true
	  end
	end
end
