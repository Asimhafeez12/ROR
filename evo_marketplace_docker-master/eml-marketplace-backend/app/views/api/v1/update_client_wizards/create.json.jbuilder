if @user.errors.any?
  json.errors @user.errors
else
  json.extract! @user, :phone_number, :country, :avatar
end
