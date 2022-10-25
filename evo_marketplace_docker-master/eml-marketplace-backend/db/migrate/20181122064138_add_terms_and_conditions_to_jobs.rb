class AddTermsAndConditionsToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :terms_and_conditions, :boolean
  end
end
