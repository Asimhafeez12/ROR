if @user.errors.any?
  json.errors @user.errors
else
  json.extract! @user, :id, :email, :full_name, :created_at, :updated_at
end
