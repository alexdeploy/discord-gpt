/**
 * MODERATION RESPONSE CHECK
 * * Checks for any content policy violations in the response of OpenAI's Content Policy moderation.
 * @param {*} moderation is an response object of OpenAI's Content Policy moderation.
 * @see Moderation https://platform.openai.com/docs/guides/moderation/moderation
 * @returns true if the moderation is safe, false if it violates the Content Policy.
 */

const moderationCheck = async (moderation) => {

    // moderation results
    const category_scores = moderation.results[0].category_scores;
    const categories = moderation.results[0].categories;

    const someIsTrue = Object.values(categories).some(valor => valor === true);

    if(someIsTrue) return false;

    return true;
}

module.exports = {
    moderationCheck
}