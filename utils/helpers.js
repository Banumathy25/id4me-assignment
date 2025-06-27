function generateRandomEmail() {
  return `user_${Date.now()}@testmail.com`;
}

function generateRandomString(len = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function pause(seconds = 2) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

module.exports = {
  generateRandomEmail,
  generateRandomString,
  pause
};

