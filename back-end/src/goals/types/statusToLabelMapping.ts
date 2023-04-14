import { Goal } from '@prisma/client';
import { Label } from './Label';

const MILLISECONDS_PER_DAY = 1000 * 3600 * 24;
const NO_PRESSURE_LIMIT = 5;
const ATTENTION_LIMIT = 2;

export const statusToLabelMapping = {
  DO: {
    getLabel: ({ difficulty }: Goal): Label[keyof Label] => Label[difficulty],
  },
  PROGRESS: {
    getLabel: ({ deliveryDate }: Goal): Label[keyof Label] => {
      const today = new Date();
      const dueDate = new Date(deliveryDate);

      const timeDiff = dueDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);

      if (daysDiff > NO_PRESSURE_LIMIT) {
        return 'No pressure';
      } else if (daysDiff > ATTENTION_LIMIT) {
        return 'Attention';
      } else if (daysDiff >= 0) {
        return 'Urgent';
      } else {
        return 'Late';
      }
    },
  },
  REVIEW: {
    getLabel: (): Label[keyof Label] => Label.IN_REVIEW,
  },
  DONE: {
    getLabel: (): Label[keyof Label] => Label.COMPLETED,
  },
};
