import { ValidationOptions, registerDecorator } from 'class-validator';

export function MinDateToday(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'minDateToday',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const minDate = new Date();
          minDate.setDate(minDate.getDate() + 3);
          const selectedDate = new Date(value);
          return selectedDate >= minDate;
        },
        defaultMessage() {
          return `The date must be at least 3 days after the current date.`;
        },
      },
    });
  };
}
