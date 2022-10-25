import ResendConfirmation from './../../../api/auth/resend_confirmation';

export function resendConfirmation() {
  return function(dispatch) {
    return ResendConfirmation.confirm().then(response => {
    })
  }
}