/**
 * cencoring text
 * @param {string} texts - The textes to be cencored
 * @returns {string}
 */
function censorText(texts) {
  return texts.replace(
    /\w+/g,
    (word) => word.at(0) + '*'.repeat(word.length - 1)
  );
}

/**
 * randomize result
 * @param {JSON} texts - The textes to be cencored
 * @returns {string}
 */
function sampleRes(texts) {
  const s = texts.reduce((a, { quantity }) => a + quantity, 0);
  let r = Math.random() * s;
  // eslint-disable-next-line no-return-assign
  return texts.find(({ quantity }) => (r -= quantity) < 0);
}

module.exports = {
  censorText,
  sampleRes,
};
