export interface ContactsListProps {
  message: string;
  data: ContactsListProps_Data[];
}

export interface ContactsListProps_Data {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}
