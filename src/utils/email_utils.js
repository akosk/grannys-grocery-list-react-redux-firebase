
export function sendMail(items) {
  const textArray = items.map((item)=> `<li><strong>${item.name}</strong> ${item.quantity} ${item.shop} ${item.maxprice}</li>`);
  const message = textArray.join('');
  const data = {
    to_email: 'akos.kiszely@gmail.com, pekazsuest@gmail.com',
    message_html: `<ul>${message}</ul>`
  };
  emailjs.send('default_service', 'template_UzeUHAP4', data); //eslint-disable-line no-undef
}

