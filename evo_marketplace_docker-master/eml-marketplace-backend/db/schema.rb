# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190314014903) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accept_freelancers", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_accept_freelancers_on_job_id"
    t.index ["user_id"], name: "index_accept_freelancers_on_user_id"
  end

  create_table "account_informations", force: :cascade do |t|
    t.integer "user_id"
    t.string "account_currency"
    t.string "account_holder_type"
    t.string "account_routing_number"
    t.string "account_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_account_informations_on_user_id"
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "badges", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "expert_level"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "certificate_files", force: :cascade do |t|
    t.string "file"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_certificate_id"
    t.index ["user_id"], name: "index_certificate_files_on_user_id"
  end

  create_table "chat_message_files", force: :cascade do |t|
    t.string "file"
    t.bigint "chatroom_message_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chatroom_message_id"], name: "index_chat_message_files_on_chatroom_message_id"
  end

  create_table "chatroom_messages", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chatroom_id"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chatroom_id"], name: "index_chatroom_messages_on_chatroom_id"
    t.index ["user_id"], name: "index_chatroom_messages_on_user_id"
  end

  create_table "chatrooms", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "job_id"
    t.index ["job_id"], name: "index_chatrooms_on_job_id"
  end

  create_table "home_categories", force: :cascade do |t|
    t.string "title"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "job_id"
    t.index ["job_id"], name: "index_home_categories_on_job_id"
  end

  create_table "home_illustrations", force: :cascade do |t|
    t.string "title"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "job_id"
    t.index ["job_id"], name: "index_home_illustrations_on_job_id"
  end

  create_table "invited_user_jobs", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "job_id"
    t.boolean "referred_by_admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_accepted", default: true
    t.index ["job_id"], name: "index_invited_user_jobs_on_job_id"
    t.index ["user_id"], name: "index_invited_user_jobs_on_user_id"
  end

  create_table "job_advisors", force: :cascade do |t|
    t.string "full_name"
    t.string "email"
    t.string "phone_number"
    t.string "skype_id"
    t.string "available_date"
    t.string "available_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "job_categories", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "job_id"
    t.index ["job_id"], name: "index_job_categories_on_job_id"
  end

  create_table "job_cover_letters", force: :cascade do |t|
    t.string "cover_letter"
    t.string "expected_timeline"
    t.integer "expected_amount"
    t.integer "user_id"
    t.integer "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_job_cover_letters_on_job_id"
    t.index ["user_id"], name: "index_job_cover_letters_on_user_id"
  end

  create_table "job_files", force: :cascade do |t|
    t.integer "job_id"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_job_files_on_job_id"
  end

  create_table "job_incentives", force: :cascade do |t|
    t.integer "user_id"
    t.integer "job_id"
    t.integer "bonus_amount"
    t.string "bonus_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_job_incentives_on_job_id"
    t.index ["user_id"], name: "index_job_incentives_on_user_id"
  end

  create_table "job_ratings", force: :cascade do |t|
    t.integer "communication"
    t.integer "accuracy"
    t.integer "quality"
    t.integer "value"
    t.integer "deadline"
    t.integer "availability"
    t.string "review"
    t.integer "user_id"
    t.integer "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "overall_rating"
    t.string "feedback"
    t.index ["job_id"], name: "index_job_ratings_on_job_id"
    t.index ["user_id"], name: "index_job_ratings_on_user_id"
  end

  create_table "job_skills", force: :cascade do |t|
    t.bigint "job_id"
    t.bigint "skill_id"
    t.index ["job_id"], name: "index_job_skills_on_job_id"
    t.index ["skill_id"], name: "index_job_skills_on_skill_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "posted_on"
    t.string "hired_on"
    t.string "deadline"
    t.integer "minimum_budget"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "state", default: "open"
    t.boolean "is_approved", default: false
    t.datetime "approved_on"
    t.integer "job_category_id"
    t.string "starting_date"
    t.string "availability", default: "a"
    t.string "duration", default: "a"
    t.string "additional_info"
    t.string "desired_profile", default: "a"
    t.string "job_type"
    t.string "closing_date"
    t.string "category"
    t.index ["job_category_id"], name: "index_jobs_on_job_category_id"
  end

  create_table "languages", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "recipient_id"
    t.string "action"
    t.string "notifiable_type"
    t.integer "notifiable_id"
    t.boolean "is_read", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "opted_freelancers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_opted_freelancers_on_job_id"
    t.index ["user_id"], name: "index_opted_freelancers_on_user_id"
  end

  create_table "portfolios", force: :cascade do |t|
    t.string "title"
    t.string "link"
    t.string "avatar"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "project_milestones", force: :cascade do |t|
    t.string "title"
    t.datetime "closing_date"
    t.bigint "user_id"
    t.bigint "job_id"
    t.boolean "is_delivered", default: false
    t.integer "price_cents", default: 0, null: false
    t.string "price_currency", default: "USD", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.string "escrow_transaction_id"
    t.boolean "is_accepted"
    t.boolean "is_rejected"
    t.string "approval_status"
    t.string "stripe_charge_id"
    t.string "stripe_errors_message"
    t.string "state"
    t.index ["job_id"], name: "index_project_milestones_on_job_id"
    t.index ["user_id"], name: "index_project_milestones_on_user_id"
  end

  create_table "read_marks", id: :serial, force: :cascade do |t|
    t.string "readable_type", null: false
    t.integer "readable_id"
    t.string "reader_type", null: false
    t.integer "reader_id"
    t.datetime "timestamp"
    t.index ["readable_type", "readable_id"], name: "index_read_marks_on_readable_type_and_readable_id"
    t.index ["reader_id", "reader_type", "readable_type", "readable_id"], name: "read_marks_reader_readable_index", unique: true
    t.index ["reader_type", "reader_id"], name: "index_read_marks_on_reader_type_and_reader_id"
  end

  create_table "rejected_freelancers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "job_id"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_rejected_freelancers_on_job_id"
    t.index ["user_id"], name: "index_rejected_freelancers_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.string "taggable_type"
    t.integer "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.string "expert_level"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "taggings_count", default: 0
    t.string "approval_status"
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "user_badges", force: :cascade do |t|
    t.integer "user_id"
    t.integer "badge_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["badge_id"], name: "index_user_badges_on_badge_id"
    t.index ["user_id"], name: "index_user_badges_on_user_id"
  end

  create_table "user_billings", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "country"
    t.string "address"
    t.string "city"
    t.string "zip_code"
    t.boolean "send_invoice"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.index ["user_id"], name: "index_user_billings_on_user_id"
  end

  create_table "user_certificates", force: :cascade do |t|
    t.string "title"
    t.string "starting_date"
    t.string "institution_name"
    t.string "description"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ending_date"
    t.index ["user_id"], name: "index_user_certificates_on_user_id"
  end

  create_table "user_chatrooms", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chatroom_id"
    t.integer "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "chatroom_type", default: "o_to_o"
    t.boolean "is_unread", default: true
    t.index ["chatroom_id"], name: "index_user_chatrooms_on_chatroom_id"
    t.index ["user_id"], name: "index_user_chatrooms_on_user_id"
  end

  create_table "user_educations", force: :cascade do |t|
    t.string "institute_name"
    t.string "starting_date"
    t.string "degree_name"
    t.string "description"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ending_date"
    t.index ["user_id"], name: "index_user_educations_on_user_id"
  end

  create_table "user_experiences", force: :cascade do |t|
    t.string "institute_name"
    t.string "starting_date"
    t.string "degree_name"
    t.string "description"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ending_date"
    t.string "designation"
    t.string "organization_name"
    t.index ["user_id"], name: "index_user_experiences_on_user_id"
  end

  create_table "user_languages", force: :cascade do |t|
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "language_id"
    t.index ["language_id"], name: "index_user_languages_on_language_id"
    t.index ["user_id"], name: "index_user_languages_on_user_id"
  end

  create_table "user_messages", force: :cascade do |t|
    t.integer "chatroom_message_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_portfolios", force: :cascade do |t|
    t.string "title"
    t.string "link"
    t.string "avatar"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_portfolios_on_user_id"
  end

  create_table "user_skills", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "skill_id"
    t.index ["skill_id"], name: "index_user_skills_on_skill_id"
    t.index ["user_id"], name: "index_user_skills_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti"
    t.boolean "is_c_profile_setup", default: false
    t.string "avatar"
    t.string "phone_number"
    t.string "country"
    t.string "summary"
    t.boolean "is_approved", default: false
    t.datetime "approved_on"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "title"
    t.string "security_question"
    t.string "security_answer"
    t.string "deactivation_reason"
    t.boolean "is_not_active"
    t.boolean "payment_verified", default: false
    t.string "city"
    t.boolean "escrow_knowledge"
    t.string "skype"
    t.date "interview_date_availability"
    t.string "interview_time_availability"
    t.string "escrow_client_id"
    t.string "stripe_customer_id"
    t.string "stripe_default_src"
    t.string "stripe_account_id"
    t.string "stripe_reusable_token"
    t.boolean "resend_confirmation"
    t.boolean "job_posted", default: true
    t.boolean "job_approved", default: true
    t.boolean "cover_letter_received", default: true
    t.boolean "job_offer_sent", default: true
    t.boolean "job_offer_accepted", default: true
    t.boolean "job_offer_rejected", default: true
    t.boolean "milestone_created", default: true
    t.boolean "milestone_accepted", default: true
    t.boolean "milestone_agreed_by_freelancer", default: true
    t.boolean "milestone_accepted_on_escrow", default: true
    t.boolean "milestone_delivered", default: true
    t.boolean "milestone_received", default: true
    t.boolean "payment_approved", default: true
    t.boolean "invitation_received", default: true
    t.boolean "cover_letter_submitted", default: true
    t.boolean "job_offer_received", default: true
    t.boolean "job_started", default: true
    t.boolean "job_closed", default: true
    t.boolean "rating_given", default: true
    t.string "unread_messages_interval", default: "15"
    t.boolean "job_posted_email", default: true
    t.boolean "job_approved_email", default: true
    t.boolean "cover_letter_received_email", default: true
    t.boolean "job_offer_sent_email", default: true
    t.boolean "job_offer_accepted_email", default: true
    t.boolean "job_offer_rejected_email", default: true
    t.boolean "milestone_created_email", default: true
    t.boolean "milestone_accepted_email", default: true
    t.boolean "milestone_agreed_by_freelancer_email", default: true
    t.boolean "milestone_accepted_on_escrow_email", default: true
    t.boolean "milestone_delivered_email", default: true
    t.boolean "milestone_received_email", default: true
    t.boolean "payment_approved_email", default: true
    t.boolean "invitation_received_email", default: true
    t.boolean "cover_letter_submitted_email", default: true
    t.boolean "job_offer_received_email", default: true
    t.boolean "job_started_email", default: true
    t.boolean "job_closed_email", default: true
    t.boolean "rating_given_email", default: true
    t.boolean "rating_received_email", default: true
    t.boolean "rating_received", default: true
    t.string "state"
    t.string "address"
    t.string "social_security_number"
    t.string "postal_code"
    t.integer "profile_score", default: 40
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  add_foreign_key "accept_freelancers", "jobs"
  add_foreign_key "accept_freelancers", "users"
  add_foreign_key "certificate_files", "users"
  add_foreign_key "chatroom_messages", "users"
  add_foreign_key "invited_user_jobs", "jobs"
  add_foreign_key "invited_user_jobs", "users"
  add_foreign_key "jobs", "job_categories"
  add_foreign_key "notifications", "users"
  add_foreign_key "project_milestones", "jobs"
  add_foreign_key "project_milestones", "users"
  add_foreign_key "user_chatrooms", "chatrooms"
  add_foreign_key "user_chatrooms", "users"
end
