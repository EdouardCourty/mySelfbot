class CannotAddFriendException extends Error
{
  _errorMessage = "Unable to add this user as a friend.";

  constructor(customMessage = null) {
    super();
    this._errorMessage.concat(customMessage ? `\n${customMessage}` : null)
  }

  getMessage() {
    return this._errorMessage
  }
}

module.exports = CannotAddFriendException;