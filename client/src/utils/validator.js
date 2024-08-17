import * as yup from "yup";

export const newUserSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

export const signInSchema = yup.object().shape({
  email: yup.string().email('Invalid email or password').required('Email is required'),
  password: yup.string().required('Invalid email or password')
});

export async function yupValidate(schema, data) {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (error) {
    throw { name: 'ValidationError', errors: error.inner };
  }
}

