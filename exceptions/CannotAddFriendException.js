class CannotAddFriendException extends Error
{
  _errorMessage = "Unable to add this user as a friend.";

  /**
   * @param {String|null} customMessage
   */
  constructor(customMessage) {
    super(customMessage);
    if (customMessage) {
      this._errorMessage += `\n${customMessage}`
    }
  }

  /**
   * @return {string}
   */
  getMessage() {
    return this._errorMessage
  }
}

module.exports = CannotAddFriendException;
