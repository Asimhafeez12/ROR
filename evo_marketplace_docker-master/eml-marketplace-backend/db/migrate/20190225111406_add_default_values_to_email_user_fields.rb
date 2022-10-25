class AddDefaultValuesToEmailUserFields < ActiveRecord::Migration[5.1]
  def change
  	change_column :users, :job_posted_email, :boolean, :default => true
  	change_column :users, :job_approved_email, :boolean, :default => true
  	change_column :users, :cover_letter_received_email, :boolean, :default => true
  	change_column :users, :job_offer_sent_email, :boolean, :default => true
  	change_column :users, :job_offer_accepted_email, :boolean, :default => true
  	change_column :users, :job_offer_rejected_email, :boolean, :default => true
  	change_column :users, :milestone_created_email, :boolean, :default => true
  	change_column :users, :milestone_accepted_email, :boolean, :default => true
  	change_column :users, :milestone_agreed_by_freelancer_email, :boolean, :default => true
  	change_column :users, :milestone_accepted_on_escrow_email, :boolean, :default => true
  	change_column :users, :milestone_delivered_email, :boolean, :default => true
  	change_column :users, :milestone_received_email, :boolean, :default => true
  	change_column :users, :payment_approved_email, :boolean, :default => true
  	change_column :users, :invitation_received_email, :boolean, :default => true
  	change_column :users, :cover_letter_submitted_email, :boolean, :default => true
  	change_column :users, :job_offer_received_email, :boolean, :default => true
  	change_column :users, :job_started_email, :boolean, :default => true
  	change_column :users, :job_closed_email, :boolean, :default => true
  	change_column :users, :rating_given_email, :boolean, :default => true
  	change_column :users, :rating_received_email, :boolean, :default => true
  end
end
