import { v4 as uuidv4 } from 'uuid';

class Todo {
  id: string;
  title: string;
  description: string;
  done: boolean;

  constructor(title: string, description: string, done: boolean) {
    this.title = title;
    this.description = description;
    this.done = done;
    this.id = uuidv4();
  }
}

export default Todo;
