import * as Yup from 'yup'

export const  passwordSchema = Yup.string()
                                    .max(15)
                                    .min(6)
                                    .matches(
                                        /^[0-9A-Za-z]*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?][0-9a-zA-Z]*$/,
                                        'Should contain one special character'
                                    )
                                    .matches(
                                        /\d/,
                                        'Should contain a number'
                                    )
                                    .matches(
                                        /(.*[A-Z].*)/,
                                        'Should contain an uppercase letter'
                                    )
                                    .required()