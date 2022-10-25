class AddColumnsToUserExperiences < ActiveRecord::Migration[5.1]
  def change
    add_column :user_experiences, :designation, :string
    add_column :user_experiences, :organization_name, :string
  end
end
