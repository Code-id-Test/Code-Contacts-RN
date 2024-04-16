export interface ContactProps {
  message: string;
  data: ContactProps_Data[];
}

export interface ContactProps_Data {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}
