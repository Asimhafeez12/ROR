class AssignDefaultValuesToJobFields < ActiveRecord::Migration[5.1]
  def change
  	change_column :jobs, :duration, :string, :default => 'a'
  	change_column :jobs, :desired_profile, :string, :default => 'a'
  	change_column :jobs, :availability, :string, :default => 'a'
  end
end