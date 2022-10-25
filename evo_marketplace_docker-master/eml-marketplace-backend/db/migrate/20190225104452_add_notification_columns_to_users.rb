class AddNotificationColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :job_posted, :boolean, :default => true
    add_column :users, :job_approved, :boolean, :default => true
    add_column :users, :cover_letter_received, :boolean, :default => true
    add_column :users, :job_offer_sent, :boolean, :default => true
    add_column :users, :job_offer_accepted, :boolean, :default => true
    add_column :users, :job_offer_rejected, :boolean, :default => true
    add_column :users, :milestone_created, :boolean, :default => true
    add_column :users, :milestone_accepted, :boolean, :default => true
    add_column :users, :milestone_agreed_by_freelancer, :boolean, :default => true
    add_column :users, :milestone_accepted_on_escrow, :boolean, :default => true
    add_column :users, :milestone_delivered, :boolean, :default => true
    add_column :users, :milestone_received, :boolean, :default => true
    add_column :users, :payment_approved, :boolean, :default => true
    add_column :users, :invitation_received, :boolean, :default => true
    add_column :users, :cover_letter_submitted, :boolean, :default => true
    add_column :users, :job_offer_received, :boolean, :default => true
    add_column :users, :job_started, :boolean, :default => true
    add_column :users, :job_closed, :boolean, :default => true
    add_column :users, :rating_given, :boolean, :default => true
    add_column :users, :rating, :string, :default => true
    add_column :users, :received, :boolean, :default => true
    add_column :users, :unread_messages_interval, :string, :default => "15"
  end
end
