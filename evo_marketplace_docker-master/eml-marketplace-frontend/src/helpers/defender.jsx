class Defender {
  static parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  static token() {
    return localStorage.getItem("token")
  }
  static isAuthenticated () {
    if (!this.token())
      return false
    
    const tkn = this.token().split(' ')[1]
    const decoded = this.parseJwt(tkn);
    return (decoded.exp > Date.now() / 1000)
  }
  static currentUser() {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      return JSON.parse(currentUser)
    } else {
      return null
    }
  }
  static loggedIn(user, token) {
    localStorage.setItem('token', token);
    Defender.setCurrentUser(user);
  }
  static setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser')  
  }
  static update(data) {
    localStorage.setItem('currentUser', JSON.stringify(data))
  }
}

export default Defender;
