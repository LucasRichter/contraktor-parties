// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type Contract = {
  id: number
  title: string,
  start_at: Date,
  due_at: Date,
  parties_id: number[],
  file_url: string
}
