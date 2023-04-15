export interface FormCreateCardProps {
  useToggle: [boolean, (nextValue?: any) => void];
  color: string;
  members: any;
}

export interface FormData {
  title: string;
  description: string;
  people: string[];
}
