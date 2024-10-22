import * as Yup from 'yup';

export const schemaLogin = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('Here is a required field!')
      .email('Incorrect e-mail format'),
    password: Yup.string()
      .trim()
      .required('Here is a required field!')
      .min(8, 'The password must contain at least 8 characters')
      .max(20, 'The password must contain no more than 20 characters')
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
  });
  