class AddIsAcceptedToInvitedUserJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :invited_user_jobs, :is_accepted, :boolean, default: true
  end
end
