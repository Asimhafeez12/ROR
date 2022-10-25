class AddClosingDateToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :closing_date, :string
  end
end
