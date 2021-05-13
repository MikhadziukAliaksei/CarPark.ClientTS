import isEmail from 'validator/lib/isEmail';

export function email(value : any) {
  return value && !isEmail(value.trim()) ? 'Invalid email' : null;
}

function isDirty(value : any) {
  return value || value === 0;
}

export function required(requiredFields : any, values : any) {
  return requiredFields.reduce(
    (fields : any, field : any) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  );
}