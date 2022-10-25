class CreateJobAdvisors < ActiveRecord::Migration[5.1]
  def change
    create_table :job_advisors do |t|
      t.string :full_name
      t.string :email
      t.string :phone_number
      t.string :skype_id
      t.string :available_date
      t.string :available_time
      t.integer :job_id

      t.timestamps
    end
  end
end
