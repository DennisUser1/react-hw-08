import * as Yup from 'yup';

export const validationContactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/^[\p{L}\s'-]+$/u, "Invalid name field symbols! Please, use only letters, spaces, or hyphens")
    .min(3, 'Too Short Name! Minimum characters: 3')
    .max(28, 'Too Long Name! Maximum characters: 28')
    .required('Here is a required field!'),

  number: Yup.string()
    .trim()
    .required('Here is a required field!')
    .min(13, 'Too Short Number! Minimum characters: 13') 
    .max(20, 'Too Long Number! Maximum characters: 20')  
    .test('valid-number', function (value) {
      const countryCode = value ? value.slice(0, 3) : ''; 

      const countryPatterns = {
        '+38': {
          regex: /^\+38 \(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
          message: "Invalid phone number! Please, use the format: +38 (xxx)-xxx-xx-xx"
        },
        '+1': {
          regex: /^\+1 \(\d{3}\)-\d{3}-\d{4}$/,
          message: "Invalid phone number! Please, use the format: +1 (xxx)-xxx-xxxx"
        },
        '+49': {
          regex: /^\+49 \(\d{3}\)-\d{3}-\d{4}$/,
          message: "Invalid phone number! Please, use the format: +49 (xxx)-xxx-xxxx"
        },
        '+48': {
          regex: /^\+48 \(\d{3}\)-\d{3}-\d{3}$/,
          message: "Invalid phone number! Please, use the format: +48 (xxx)-xxx-xxx"
        },
        '+33': {
          regex: /^\+33 \(\d{2}\)-\d{2}-\d{2}-\d{2}-\d{2}$/,
          message: "Invalid phone number! Please, use the format: +33 (xx)-xx-xx-xx-xx"
        }
      };

      if (value && value.startsWith('+1')) {
        const usPattern = /^\+1 \(\d{3}\)-\d{3}-\d{4}$/;
        if (usPattern.test(value)) {
          return true;
        } else {
          return this.createError({ message: countryPatterns['+1'].message });
        }
      }

      const countryPattern = countryPatterns[countryCode];

      if (countryPattern && countryPattern.regex.test(value)) {
        return true;
      } else if (countryPattern) {
        return this.createError({ message: countryPattern.message });
      }

      return this.createError({ message: "Invalid phone number format!" });
    })
});
