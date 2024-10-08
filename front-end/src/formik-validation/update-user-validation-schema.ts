import * as Yup from 'yup';

const UpdateUserValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name is too short ')
    .max(30, 'Name is too long')
    .required('Name is required'),
  surname: Yup.string()
    .trim()
    .min(2, 'Last name is too short ')
    .max(30, 'Last name is too long')
    .required('Last name is required'),
  username: Yup.string()
    .trim()
    .min(2, 'Username is too short ')
    .max(30, 'Username is too long')
    .required('Username is required'),
  phone: Yup.string()
    .trim()
    .min(5, 'Phone is too short ')
    .max(15, 'Phone is too long')
    .matches(
      /^\+[0-9]+$/,
      'Phone number must start with a + and contain only numbers',
    )
    .required('Phone is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Invalid email format',
    )
    .required('Email is required'),
  currentPassword: Yup.string()
    .trim()
    .when('$newPassword', {
      is: (newPassword: string) => !!newPassword,
      then: (s) => s.required('Current password is required'),
      otherwise: (s) => s.notRequired(),
    }),
  newPassword: Yup.string()
    .trim()
    .when('$currentPassword', {
      is: (currentPassword: string) => !!currentPassword,
      then: (s) => s
        .min(8, 'Password must contain 8 or more characters with at least one of each: uppercase, lowercase and number')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('New password is required'),
      otherwise: (s) => s.notRequired(),
    }),
});

export default UpdateUserValidationSchema;
