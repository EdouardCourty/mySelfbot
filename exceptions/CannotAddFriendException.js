const Exception = require("./Exception");

class CannotAddFriendException extends Exception
{
  constructor() {
    super("Unable to add this user as a friend.");
  }
}

module.exports = CannotAddFriendException;