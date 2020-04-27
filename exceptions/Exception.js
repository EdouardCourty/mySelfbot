class Exception extends Error
{
  #errorMessage = "Unable to add this user as a friend.";

  /**
   * @param {String|null} customMessage
   */
  constructor(customMessage) {
    super(customMessage);
    if (customMessage) {
      this.#errorMessage += `\n${customMessage}`
    }
  }

  /**
   * @return {string}
   */
  getMessage() {
    return this.#errorMessage
  }
}

module.exports = Exception;
