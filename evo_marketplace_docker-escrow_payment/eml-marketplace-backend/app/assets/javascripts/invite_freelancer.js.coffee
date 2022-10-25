class InviteUserForm
  constructor: (@userInfo) ->
    rand = Math.floor(Math.random() * (100000 - 1 + 1)) + 1
    @fieldName = "job[invited_user_jobs_attributes][#{rand}]"
    @$fieldContainers = $("#invited_freelancers_container")
  html: ->
    """
      <div class='parent-container'>
        <input type='hidden' name='#{@fieldName}[_destroy]' value='1' disabled class='delete-field' />
        <input type='hidden' name='#{@fieldName}[user_id]' value='#{@userInfo.id}' />
        <input type='hidden' name='#{@fieldName}[referred_by_admin]' value='1' />
        <label> #{@userInfo.full_name} - #{@userInfo.email}</label>
        <a href='#' class='remove-iv-f'>Remove</a>
      </div>
    """
  render: ->
    @$fieldContainers.append(@html())

$ ->
  $('body').on 'click', '.remove-iv-f', (event) ->
    event.preventDefault()
    $parentContainer = $(this).parents('.parent-container')
    $parentContainer.find('.delete-field').prop('disabled', false)
    $parentContainer.hide()
  if $("#invite_freelancers_input").length
    $( "#invite_freelancers_input" ).autocomplete({
      minLength: 3,
      select: (event, ui) ->
        (new InviteUserForm(ui.item)).render()
      source: (request, response) ->
        jQuery.ajax({
          type: "GET",
          url: "/admin/openned_jobs/search_freelancers.json?q[first_name_or_last_name_or_email_cont]=#{request.term}",
          dataType: "json",
        }).done( (data) ->
          response(data)
        )
    }).autocomplete("instance")._renderItem = (ul, item) ->
      return $("<li>")
        .append("<div>" + item.full_name + "<br>" + item.email + "</div>")
        .appendTo(ul)

