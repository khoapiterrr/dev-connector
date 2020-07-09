/**
/**
 *
 * This call sends a message to one recipient.
 *
 */

const sendMail = async (payload) => {
  console.log(process.env.MJ_APIKEY_PUBLIC, 'process.env.MJ_APIKEY_PUBLIC');
  const mailjet = require('node-mailjet').connect(
    '9c591b7e007f8bfe250517c749ec1e65',
    '3292bb907b9d929545b4156e820f2717',
  );
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'ltk.gym@gmail.com',
          Name: 'Trọng Khoa',
        },
        To: [
          {
            Email: payload.email,
            Name: payload.name,
          },
        ],
        Subject: payload.subject,
        TextPart: payload.textPart,
        HTMLPart: payload.htmlPart,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = sendMail;
