class CreateInvitedUserJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :invited_user_jobs do |t|
      t.references :user, foreign_key: true
      t.references :job, foreign_key: true
      t.boolean :referred_by_admin, default: false

      t.timestamps
    end
  end
end
