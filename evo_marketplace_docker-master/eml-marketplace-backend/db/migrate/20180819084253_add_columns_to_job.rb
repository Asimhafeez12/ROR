class AddColumnsToJob < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :starting_date, :string
    add_column :jobs, :availability, :string
    add_column :jobs, :duration, :string
    add_column :jobs, :additional_info, :string
    add_column :jobs, :desired_profile, :string
  end
end
