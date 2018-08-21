const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {
  new() {
      return this.user.role == "member" || this._isAdmin();
  }

  create() {
      return this.new();
  }

  edit() {
    return this._isAdmin() || this._isOwner() || this.user.role == "owner";
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}