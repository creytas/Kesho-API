const htmlEscape = (data) => {
  return data.replace(/[&<>"']/g, function onReplace(match) {
    return "&#" + match.charCodeAt(0) + ";";
  });
};
module.exports = htmlEscape;
