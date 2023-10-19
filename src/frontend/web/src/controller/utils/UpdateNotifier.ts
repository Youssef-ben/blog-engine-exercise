interface UpdateNotifierSubscriber {
  id: string;
  callback: () => void;
}

type ChangeTypes = 'categories' | 'posts';

/**
 * This is a little hack to force the category and post list to update
 * ideally this should be done using WebSockets
 */
export class UpdateNotifier {
  private static subscribers: UpdateNotifierSubscriber[] = [];

  static notify(target: ChangeTypes) {
    this.subscribers.forEach((sub) => sub.id === target && sub.callback());
  }

  static subscribe(listener: ChangeTypes, callback: () => void) {
    this.subscribers.push({
      id: listener,
      callback: callback,
    });
  }
}
