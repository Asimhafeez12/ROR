class CurrentUserAdapter
  attr_accessor :user

  def initialize(user)
    self.user = user
  end

  def find_or_create_escrow_client_id
    escrow_client_id || nil

  end

  delegate :escrow_client_id, to: :user, allow_nil: true
end

