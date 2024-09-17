export interface IProject {
  id: string;
  title: string;
  state: 'recruiting' | 'inProgress' | 'complete';
  location: string;
  date: string;
  time: string;
}
