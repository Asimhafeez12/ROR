module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.full_name

    end

    protected
    def find_verified_user
      token= request.params[:token].split(" ")[1]
      verified_user = (Warden::JWTAuth::UserDecoder.new.call(token, :user, nil))
      if verified_user
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
