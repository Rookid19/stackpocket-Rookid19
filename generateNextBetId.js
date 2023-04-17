  /**
   * gets the next bet id from the current one. Bet id is of the form '202501260002'(YYYYMMDD+IDDD)
   * @param {string} currentBetId the current bet id eg '202501260002'
   * @param {string} idDateTime the date time '@currentBetId' was generated
   * @param {number} intervalMinutes interval of generation. useful in restarting bet generation on next day
   * @returns next bet id
   */
  generateNextBetId(
    currentBetId,
    idDateTime,
    intervalMinutes = intervalMinutes
  ) {
    let startId = 1;
    let appendedId = +String(currentBetId).slice(-4);
    let nextGenerationDateTime = this.addMinutes(idDateTime, intervalMinutes);
    let id = this.isNextDay(idDateTime, nextGenerationDateTime)
      ? startId
      : +appendedId + 1;
    return this.getBetId(nextGenerationDateTime, id);
  }