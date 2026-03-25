const RegistrationDefaultValues = {
    name: '',
    email: '',
    password: '',
} as const;

const SignInDefaultValues = {
    email: '',
    password: '',
} as const;

export { SignInDefaultValues, RegistrationDefaultValues };
