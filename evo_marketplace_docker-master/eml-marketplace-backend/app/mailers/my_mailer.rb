class MyMailer < Devise::Mailer   
  default :from => 'no-reply@evolvemachinelearners.com'
  helper :application # gives access to all helpers defined within `application_helper`.
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`
  default template_path: 'users/mailer' # to make sure that your mailer uses the devise views

  def account_deactivated_successfully(user)
    @user_email = user.email
    @user_full_name = user.first_name
    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "USER_FULL_NAME" => @user_full_name,
    }
    body = mandrill_template("[General] Account Deactivated", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Your account has been deactivated",body: body, content_type: "text/html")
  end

  def password_updated_successfully(user)
    @user_email = user.email
    @user_full_name = user.first_name
    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "USER_FULL_NAME" => @user_full_name,
    }
    body = mandrill_template("[General] Password Updated", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Your password has been updated",body: body, content_type: "text/html")
  end

  def confirmation_instructions(record, token, opts={})
    @user_email = record.email
    @user_full_name = record.first_name
    @confirmation_link = "https://www.wurker.ai/confirmation/#{record.id}/mail/#{token}" if Rails.env.production?
    @confirmation_link = "http://localhost:3000/confirmation/#{record.id}/mail/#{token}" if Rails.env.development?
    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "USER_FULL_NAME" => @user_full_name,
        "CONFIRMATION_LINK" => @confirmation_link,
    }
    body = mandrill_template("[General] Account Verification", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Confirmation Instructions",body: body, content_type: "text/html")
  end

  # Overrides same inside Devise::Mailer
  def reset_password_instructions(record, token, opts={})
    @user_email = record.email
    @user_full_name = record.first_name
    @password_reset_link = "https://www.wurker.ai/password/edit/#{token}" if Rails.env.production?
    @password_reset_link = "http://localhost:3000/password/edit/#{token}" if Rails.env.development?
    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "USER_FULL_NAME" => @user_full_name,
        "PASSWORD_RESET_LINK" => @password_reset_link,
    }
    body = mandrill_template("[General] Reset password", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Reset password instructions",body: body, content_type: "text/html")
  end

  # Overrides same inside Devise::Mailer
  def unlock_instructions(record, token, opts={})
    super
  end

  def badge_given(user_id, badge_id)
    @user = User.find(user_id)
    @badge = Badge.find(badge_id)
    @user_email = @user.email
    @user_full_name=@user.first_name
    @user_id = user_id
    @badge_title = @badge.title
    @badge_level = @badge.expert_level

    merge_vars = {
        "FREELANCER_FULL_NAME" => @user_full_name,
        "BADGE_TITLE" => @badge_title,
        "BADGE_LEVEL" => @badge_level,
        "USER_ID" => @user_id
    }
    body = mandrill_template("[Freelancer] You've been given a badge.", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - You've been given a badge",body: body, content_type: "text/html")
  end

  def contact_us(full_name, email, message)
    @full_name = full_name;
    @email = email;
    @message = message;
    merge_vars = {
        "FULL_NAME" =>  @full_name,
        "EMAIL" => @email,
        "MESSAGE" => @message
    }
    @admins = ["usman.ghani720@gmail.com", 'ashar@evolvemachinelearners.com', 'akber@evolvemachinelearners.com', 'ihsan@evolvemachinelearners.com', 'support@wurker.ai', 'mehreen@wurker.ai']
    body = mandrill_template("[Admin] Contact us", merge_vars)
    mail(to: @admins, subject: "Wurker.AI - Contact us",body: body, content_type: "text/html")  
  end

  def job_consultation(job_advisor)
    @full_name = job_advisor.full_name;
    @email = job_advisor.email;
    @phone_number = job_advisor.phone_number;
    @skype_id = job_advisor.skype_id;
    merge_vars = {
        "FULL_NAME" =>  @full_name,
        "EMAIL" => @email,
        "PHONE_NUMBER" => @phone_number,
        "SKYPE_ID" => @skype_id
    }
    @admins = ["usman.ghani720@gmail.com"] if Rails.env.development?
    @admins = ["usman.ghani720@gmail.com", 'ashar@evolvemachinelearners.com', 'akber@evolvemachinelearners.com', 'ihsan@evolvemachinelearners.com', 'support@wurker.ai'] if Rails.env.production?
    body = mandrill_template("[Admin] Job consultation", merge_vars)
    mail(to: @admins, subject: "Wurker.AI - Job Consultation",body: body, content_type: "text/html")  
  end

  def job_consultation_to_user(job_advisor)
    @full_name = job_advisor.full_name;
    @email = job_advisor.email;
    merge_vars = {
        "FULL_NAME" =>  @full_name,
    }
    body = mandrill_template("[Client] Job consultation to user", merge_vars)
    mail(to: @email, subject: "Wurker.AI - Job Consultation",body: body, content_type: "text/html")  
  end

  def cover_letter_received(cover_letter)
    @user_email = cover_letter.job_user_email
    @freelance_full_name=cover_letter.user_first_name
    @client_full_name, = cover_letter.job_user_first_name
    @job_title = cover_letter.job_title
    @job_id = cover_letter.job_id
    @cover_letter = cover_letter.cover_letter
    @budget = cover_letter.expected_amount
    @timeline = cover_letter.expected_timeline
    @user_id = cover_letter.user_id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_FULL_NAME" => @freelance_full_name,
        "CLIENT_FULL_NAME" => @client_full_name,
        "JOB_TITLE" => @job_title,
        "JOB_ID" => @job_id,
        "COVER_LETTER" => @cover_letter,
        "PROPOSED_BUDGET" => @budget,
        "PROPOSED_TIME_DUR" => @timeline,
        "USER_ID" => @user_id
    }
    body = mandrill_template("[Client] Cover letter received", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Cover letter has been received",body: body, content_type: "text/html")
  end

  def job_posted(job)
    @user_email = job.user_email
    @user_full_name=job.user_first_name
    @job_title = job.title
    @job_id = job.id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Job posted", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Your job has been posted",body: body, content_type: "text/html")
  end

  def job_approved(job)
    @user_email = job.user_email
    @user_full_name=job.user_first_name
    @job_title = job.title
    @job_id = job.id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Job approved", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Your job has been approved",body: body, content_type: "text/html")
  end

  def job_initiated(accepted_freelancer)
    @user_email = accepted_freelancer.user_email
    @client_full_name=accepted_freelancer.job_user_first_name
    @freelancer_full_name = accepted_freelancer.user_first_name
    @job_title = accepted_freelancer.job_title
    @amount = accepted_freelancer.job_amount_remaining_for_open_milestones/100
    @job_duration = accepted_freelancer.job_translated_duration
    @job_availability = accepted_freelancer.job_translated_availability
    @job_id = accepted_freelancer.job_id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @client_full_name,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "JOB_TITLE" => @job_title,
        "AGREED_BUDGET" => @amount,
        "AGREED_AVAILABILITY" => @job_availability,
        "AGREED_TIME_DUR" => @job_duration,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Freelancer] Job Started", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Job has been initiated",body: body, content_type: "text/html")
  end

  def job_completed(job, user, job_rating)
    @user_email = user.email
    @job_title = job.title
    @client_full_name = job.user_first_name
    @total_earned = job.amount_paid_for_completed_milestones/100
    @rating_received = job_rating.rounded_overall_rating
    @job_id = job.id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "USER_FULL_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "CLIENT_FULL_NAME" => @client_full_name,
        "TOTAL_EARNED" => @total_earned,
        "RATING_RECEIVED" => @rating_received,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Freelancer] Contract Ended", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Job has been completed",body: body, content_type: "text/html")
  end

  def rating_given_by_freelancer(job, user, job_rating)
    @user_email = user.email
    @job_title = job.title
    @rating_received = job_rating.rounded_overall_rating
    @job_id = job.id
    @client_full_name = job.user_first_name

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "JOB_TITLE" => @job_title,
        "RATING_RECEIVED" => @rating_received,
        "JOB_ID" => @job_id,
        "CLIENT_FULL_NAME" => @client_full_name
    }
    body = mandrill_template("[Freelancer] Rating given by freelancer", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - You have given rating to client",body: body, content_type: "text/html")
  end

  def job_completed_by_freelancer(job, user, job_rating)
    @user_email = job.user_email
    @job_title = job.title
    @freelancer_full_name = user.first_name
    @rating_received = job_rating.rounded_overall_rating
    @job_id = job.id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "JOB_TITLE" => @job_title,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "RATING_RECEIVED" => @rating_received,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Rating given to client", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - You have received rating from freelancer",body: body, content_type: "text/html")
  end

  def job_closed_successfully(job, user, job_rating)
    @user_email = job.user_email
    @job_title = job.title
    @freelancer_full_name = user.first_name
    @total_paid = job.amount_paid_for_completed_milestones/100
    @rating_given = job_rating.rounded_overall_rating
    @job_id = job.id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "USER_FULL_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "TOTAL_PAID" => @total_paid,
        "RATING_GIVEN" => @rating_given,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Job Closed Successfully", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Job has been closed successfully",body: body, content_type: "text/html")
  end

  def job_offer_accepted(accepted_freelancer)
    @user_email = accepted_freelancer.job_user_email
    @client_full_name=accepted_freelancer.job_user_first_name
    @freelancer_full_name = accepted_freelancer.user_first_name
    @job_title = accepted_freelancer.job_title
    @amount = accepted_freelancer.job_amount_remaining_for_open_milestones/100
    @job_id = accepted_freelancer.job_id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @client_full_name,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "JOB_TITLE" => @job_title,
        "AGREED_AMOUNT" => @amount,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Job offer accepted", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Your job offer has been accepted",body: body, content_type: "text/html")
  end

  def job_offer_rejected(rejected_freelancer)
    @user_email = rejected_freelancer.job_user_email
    @client_full_name=rejected_freelancer.job_user_first_name
    @freelancer_full_name = rejected_freelancer.user_first_name
    @job_title = rejected_freelancer.job_title
    @rejection_reason = rejected_freelancer.description
    @job_id = rejected_freelancer.job_id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @client_full_name,
        "JOB_TITLE" => @job_title,
        "JOB_REJECTION_REASON" => @rejection_reason,
        "JOB_ID" => @job_id,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
    }
    body = mandrill_template("[Client] Job offer rejected", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Your job offer has been rejected",body: body, content_type: "text/html")
  end

  def freelancer_rejected(job, user)
    @user_email = user.email
    @client_full_name=job.user_first_name
    @freelancer_full_name = user.firstpt_name
    @job_title = job.title

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @client_full_name,
        "JOB_TITLE" => @job_title,
        "FREELANCER_FULL_NAME" => @freelancer_full_name
    }
    body = mandrill_template("[Freelancer] Freelancer rejected", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - You have been rejected as a freelancer",body: body, content_type: "text/html")
  end

  def job_offer_received(opted_freelancer)
    @user_email = opted_freelancer.user_email
    @user_full_name=opted_freelancer.user_first_name
    @job_id=opted_freelancer.job_id
    @job_title = opted_freelancer.job_title
    @job_description = opted_freelancer.job_description
    @job_budget = opted_freelancer.job_minimum_budget
    @job_duration = opted_freelancer.job_translated_duration
    @job_availability = opted_freelancer.job_translated_availability

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_FULL_NAME" => @user_full_name,
        "JOB_ID" => @job_id,
        "AVAILABILITY_REQ" => @job_availability,
        "EST_TIME_DUR" => @job_duration,
        "BUDGET" => @job_budget,
        "JOB_TITLE" => @job_title,
        "JOB_DESCRIPTION" => @job_description
    }
    body = mandrill_template("[Freelancer] Job offer received", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Job offer has been received",body: body, content_type: "text/html")
  end

  def job_offer_sent(opted_freelancer)
    @client_full_name=opted_freelancer.job_user_first_name
    @freelancer_full_name = opted_freelancer.user_first_name
    @job_title = opted_freelancer.job_title
    @client_email = opted_freelancer.job_user_email
    @job_id = opted_freelancer.job_id

    merge_vars = {
        "CLIENT_FULL_NAME" => @client_full_name,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "JOB_TITLE" => @job_title,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Job offer sent", merge_vars)
    mail(to: @client_email, subject: "Wurker.AI - You job offer offer has been sent",body: body, content_type: "text/html")
  end

  def account_approved(user)
    @user_full_name=user.first_name
    @user_email = user.email

    merge_vars = {
        "FREELANCER_FULL_NAME" => @user_full_name,
    }
    body = mandrill_template("[Freelancer] Account approved", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Your account has been approved",body: body, content_type: "text/html")
  end

  def job_recommendation(invited_user)
    @user_email = invited_user.user_email
    @user_full_name=invited_user.user_first_name
    @job_id=invited_user.job_id
    @job_title = invited_user.job_title
    @job_description = invited_user.job_description
    @job_budget = invited_user.job_minimum_budget
    @job_duration = invited_user.job_translated_duration
    @job_availability = invited_user.job_translated_availability

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_FULL_NAME" => @user_full_name,
        "JOB_ID" => @job_id,
        "AVAILABILITY_REQ" => @job_availability,
        "EST_TIME_DUR" => @job_duration,
        "BUDGET" => @job_budget,
        "JOB_TITLE" => @job_title,
        "JOB_DESCRIPTION" => @job_description
    }
    body = mandrill_template("[Freelancer] You are invited to submit a proposal", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - You are invited to submit a proposal",body: body, content_type: "text/html")
  end

  def milestone_created(milestone)
    @user_email = milestone.job_user_email
    @user_full_name=milestone.job_user_first_name
    @job_title = milestone.job_title
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")
    @job_id = milestone.job_id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_TITLE" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "MILESTONE_CLOSING_DATE"=> @milestone_closing_date,
        "JOB_ID"=> @job_id
    }
    body = mandrill_template("[Client] Milestone created", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Milestone has been created",body: body, content_type: "text/html")
  end

  def milestone_accepted(milestone)
    @user_email = milestone.job_user_email
    @client_full_name=milestone.job_user_first_name
    @freelancer_full_name=milestone.user.first_name
    @job_id = milestone.job_id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @client_full_name,
        "FREELANCER_FULL_NAME"=> @freelancer_full_name,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Milestone accepted", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Milestone has been accepted",body: body, content_type: "text/html")
  end

  def milestone_approved(milestone)
    @user_email = milestone.job_user_email
    @user_full_name=milestone.job_user_first_name
    @job_title = milestone.job_title
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
    }
    body = mandrill_template("[Client] Milestone accepted on Escrow", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - You have accepted the milestone on Escrow",body: body, content_type: "text/html")
  end

  def milestone_approved_to_freelancer(milestone)
    @user_email = milestone.user.email
    @freelancer_full_name=milestone.user.first_name
    @job_title = milestone.job_title
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @job_id = milestone.job_id

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Freelancer] Milestone is accepted by client", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Milestone has been accepted by client on Escrow",body: body, content_type: "text/html")
  end


  def milestone_agreed_by_freelancer(milestone)
    @user_email = milestone.job_user_email
    @user_full_name=milestone.job_user_first_name
    @freelancer_full_name=milestone.user.first_name
    @job_title = milestone.job_title
    @job_id = milestone.job_id
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @user_full_name,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Milestone agreed by freelancer on Escrow", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Milestone terms have been agreed by freelancer on Escrow",body: body, content_type: "text/html")
  end


  def milestone_agreed_by_client(milestone)
    @user_email = milestone.user.email
    @user_full_name=milestone.user.first_name
    @client_full_name=milestone.job_user_first_name
    @job_title = milestone.job_title
    @job_id = milestone.job_id
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_FULL_NAME" => @user_full_name,
        "CLIENT_FULL_NAME" => @client_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Freelancer] Milestone agreed by client on Escrow", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Milestone terms have been agreed by client on Escrow",body: body, content_type: "text/html")
  end

  def milestone_received_by_client_notify_client(milestone)
    @user_email = milestone.job_user_email
    @user_full_name=milestone.job_user_first_name
    @job_title = milestone.job_title
    @job_id = milestone.job_id
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] You've received the milestone on Escrow", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - You have received the milestone on Escrow",body: body, content_type: "text/html")
  end


  def milestone_received_by_client_notify_freelancer(milestone)
    @user_email = milestone.user.email
    @user_full_name=milestone.user.first_name
    @job_title = milestone.job_title
    @job_id = milestone.job_id
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_FULL_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Freelancer]Milestone received by client on Escrow", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Milestone has been received by client on Escrow",body: body, content_type: "text/html")
  end


  def payment_approved_notify_client(milestone)
    @user_email = milestone.job_user_email
    @user_full_name=milestone.job_user_first_name
    @freelancer_full_name=milestone.user.first_name
    @job_title = milestone.job_title
    @job_id = milestone.job_id
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @user_full_name,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Your payment has been approved on Escrow", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Payment has been received and approved by escrow",body: body, content_type: "text/html")
  end


  def payment_approved_notify_freelancer(milestone)
    @user_email = milestone.user.email
    @user_full_name=milestone.user.first_name
    @client_full_name=milestone.job_user_first_name
    @job_title = milestone.job_title
    @job_id = milestone.job_id
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_FULL_NAME" => @user_full_name,
        "CLIENT_FULL_NAME" => @client_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Freelancer] Client has made the payment on Escrow", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Client has made the payment on Escrow",body: body, content_type: "text/html")
  end

  def milestone_shipped_by_freelancer_notify_client(milestone)
    @user_email = milestone.job_user_email
    @user_full_name=milestone.job_user_first_name
    @freelancer_full_name=milestone.user.first_name
    @job_title = milestone.job_title
    @job_id = milestone.job_id
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_FULL_NAME" => @user_full_name,
        "FREELANCER_FULL_NAME" => @freelancer_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Client] Milestone is delivered on Escrow", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - Milestone has been delivered by freelancer on Escrow",body: body, content_type: "text/html")
  end


  def milestone_shipped_by_freelancer_notify_freelancer(milestone)
    @user_email = milestone.user.email
    @user_full_name=milestone.user.first_name
    @client_full_name=milestone.job_user_first_name
    @job_title = milestone.job_title
    @job_id = milestone.job_id
    @milestone_title = "Milestone #{milestone.milestone_count}"
    @milestone_budget = milestone.price_cents/100
    @milestone_closing_date = milestone.closing_date.strftime("%b %d %Y")

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_FULL_NAME" => @user_full_name,
        "CLIENT_FULL_NAME" => @client_full_name,
        "JOB_TITLE" => @job_title,
        "MILESTONE_NAME" => @milestone_title,
        "MILESTONE_BUDGET"=> @milestone_budget,
        "JOB_ID" => @job_id
    }
    body = mandrill_template("[Freelancer] You have delivered the milestone", merge_vars)
    mail(to: @user_email, subject: "Wurker.AI - You have delivered the milestone on Escrow",body: body, content_type: "text/html")
  end

  def freelancer_registered(user)
    @user_email = user.email
    @user_full_name=user.full_name
    @skype = user.skype
    @date = user.interview_date_availability
    @time = user.interview_time_availability.to_datetime.strftime("%I:%M%p")
    @skills = user.skill_list.map(&:inspect).join(', ')

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "FREELANCER_NAME" => @user_full_name,
        "SKYPE" => @skype,
        "DATE" => @date,
        "TIME" => @time,
        "FREELANCER_SKILLS" => @skills
    }
    @admins = ["usman.ghani720@gmail.com"] if Rails.env.development?
    @admins = ["usman.ghani720@gmail.com", 'ashar@evolvemachinelearners.com', 'akber@evolvemachinelearners.com', 'ihsan@evolvemachinelearners.com', 'support@wurker.ai'] if Rails.env.production?
    body = mandrill_template("[Admin] New freelancer applied", merge_vars)
    mail(to: @admins, subject: "Wurker.AI - A new freelancer submitted his application on wurker.ai, Please manage him",body: body, content_type: "text/html")  
  end

  def client_registered(user, job)
    @user_email = user.email
    @user_full_name=user.full_name
    @job_title = job.title
    @job_description = job.description
    @client_type = "NEW" if user.jobs.count === 1
    @client_type = "OLD" if user.jobs.count > 1

    merge_vars = {
        "USER_EMAIL" =>  @user_email,
        "CLIENT_NAME" => @user_full_name,
        "JOB_TITLE" => @job_title,
        "JOB_DESCRIPTION" => @job_description,
        "CLIENT_TYPE" => @client_type
    }
    @admins = ["usman.ghani720@gmail.com"] if Rails.env.development?
    @admins = ["usman.ghani720@gmail.com", 'ashar@evolvemachinelearners.com', 'akber@evolvemachinelearners.com', 'ihsan@evolvemachinelearners.com', 'support@wurker.ai'] if Rails.env.production?
    body = mandrill_template("[Admin] New job is posted", merge_vars)
    mail(to: @admins, subject: "A new job is posted on wurker.ai, Please manage it", body: body, content_type: "text/html")  
  end

  def skill_added(skill)

    merge_vars = {
        "SKILLS" => skill
    }
    @admins = ["usman.ghani720@gmail.com"] if Rails.env.development?
    @admins = ["usman.ghani720@gmail.com", 'ashar@evolvemachinelearners.com', 'akber@evolvemachinelearners.com', 'ihsan@evolvemachinelearners.com', 'support@wurker.ai'] if Rails.env.production?
    body = mandrill_template("[Admin] New skill added", merge_vars)
    mail(to: @admins, subject: "Wurker.AI - New Skills have been added on wurker.ai, Please manage them",body: body, content_type: "text/html")  
  end

  def notify_user_about_unread_messages(user_id, messages)
    @user = User.find_by(id: user_id); @unread_messages = messages;
    mail :subject => "Wurker.Ai - You have unread messages",
         :to      => @user.email,
         :from    => 'support@wurker.ai'
  end

  def email_name

  end

  private
  def mandrill_template(template_name, attributes)
    mandrill = Mandrill::API.new('FIk-Ux3LBBv4i_71B2spow')

    merge_vars = attributes.map do |key, value|
      { name: key, content: value }
    end

    mandrill.templates.render(template_name, [], merge_vars)["html"]
  end

end