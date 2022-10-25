class AgreeEscrowCallback
  attr_accessor :transaction
  def initialize(transaction)
    self.transaction = transaction
  end
  def commit!
  	transaction.update(state: 'agree', is_accepted: true)
    Notification.create(action: "notifications.job.milestone.escrow.agreed.client", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.job.user_id, user_id: transaction.user_id) if User.find(transaction.job.user_id).milestone_agreed_by_freelancer == true
    Notification.create(action: "notifications.job.milestone.escrow.agreed.freelancer", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.user_id, user_id: transaction.user_id) if User.find(transaction.user_id).milestone_agreed_by_freelancer == true
    MyMailer.milestone_agreed_by_freelancer(transaction).deliver_later if User.find(transaction.job.user_id).milestone_agreed_by_freelancer_email == true
    MyMailer.milestone_agreed_by_client(transaction).deliver_later if User.find(transaction.user_id).milestone_agreed_by_freelancer_email == true
  end
end