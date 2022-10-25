class AddEmailColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :job_posted_email, :boolean
    add_column :users, :job_approved_email, :boolean
    add_column :users, :cover_letter_received_email, :boolean
    add_column :users, :job_offer_sent_email, :boolean
    add_column :users, :job_offer_accepted_email, :boolean
    add_column :users, :job_offer_rejected_email, :boolean
    add_column :users, :milestone_created_email, :boolean
    add_column :users, :milestone_accepted_email, :boolean
    add_column :users, :milestone_agreed_by_freelancer_email, :boolean
    add_column :users, :milestone_accepted_on_escrow_email, :boolean
    add_column :users, :milestone_delivered_email, :boolean
    add_column :users, :milestone_received_email, :boolean
    add_column :users, :payment_approved_email, :boolean
    add_column :users, :invitation_received_email, :boolean
    add_column :users, :cover_letter_submitted_email, :boolean
    add_column :users, :job_offer_received_email, :boolean
    add_column :users, :job_started_email, :boolean
    add_column :users, :job_closed_email, :boolean
    add_column :users, :rating_given_email, :boolean
    add_column :users, :rating_received_email, :boolean
  end
end
