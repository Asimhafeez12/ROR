class RemoveTermsAndConditionsFromJobs < ActiveRecord::Migration[5.1]
  def change
    remove_column :jobs, :terms_and_conditions, :boolean
  end
end
