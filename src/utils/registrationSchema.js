import * as Yup from 'yup';

const tempEmailDomains = [
  'temp-mail.org',
  'yopmail.com',
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'dispostable.com',
  'getnada.com',
  'trashmail.com',
  'tempmail.net',
  'fakeinbox.com',
  'mohmal.com',
  'maildrop.cc',
  'emailondeck.com',
];

const isTemporaryEmail = (email) => {
  const domain = email.split('@')[1];
  return tempEmailDomains.includes(domain);
};

export const schemaRegistration = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('The field cannot be empty')
    .email('Incorrect e-mail format')
    .test('is-temp-email', 'Temporary mailboxes cannot be used', (value) => {
      return !isTemporaryEmail(value);
    }),
  password: Yup.string()
    .trim()
    .required('The field cannot be empty')
    .min(8, 'The password must contain at least 8 characters')
    .matches(
      /^[A-Za-z0-9\s"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/,
      'The password contains invalid characters'
    )
    .matches(/[A-Z]/, 'The password must contain at least one capital letter')
    .matches(/\d/, 'The password must contain at least one digit')
    .test(
      'required-special-chars',
      'The password must contain at least one special character: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
      value => {
        const requiredSpecialChars = /["#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
        return requiredSpecialChars.test(value || '');
      }
    ),
  confirmPass: Yup.string()
    .trim()
    .required('The field cannot be empty')
    .oneOf([Yup.ref('password')], 'The passwords must match'),
});
