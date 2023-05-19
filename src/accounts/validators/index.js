import Joi from 'joi';

/**
 *  The password must contain at least one digit [0-9].
    The password must contain at least one lowercase letter [a-z].
    The password must contain at least one uppercase letter [A-Z].
    The password must contain at least one special character [@#$%^&-+=()].
    The password must not contain any whitespace character.
    The password length must be between 7 and 20 characters.
 */
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{7,20}$/;

const accountSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).max(20).regex(passwordRegex).required(),
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30).required()
});

export default { account: accountSchema };