class AcceptEscrowCallback
  attr_accessor :transaction
  def initialize(transaction)
    self.transaction = transaction
  end
  def commit!
  	transaction.update(state: 'accept', is_delivered: true)
  	Notification.create(action: "notifications.job.milestone.escrow.accept.freelancer", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.user_id, user_id: transaction.user_id) if User.find(transaction.user_id).milestone_accepted_on_escrow == true
    Notification.create(action: "notifications.job.milestone.escrow.accept.client", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.job.user_id, user_id: transaction.user_id) if User.find(transaction.job.user_id).milestone_accepted_on_escrow == true
    MyMailer.milestone_approved(transaction).deliver_later if User.find(transaction.job.user_id).milestone_accepted_on_escrow_email == true
    MyMailer.milestone_approved_to_freelancer(transaction).deliver_later if User.find(transaction.user_id).milestone_accepted_on_escrow_email == true
  end
end
