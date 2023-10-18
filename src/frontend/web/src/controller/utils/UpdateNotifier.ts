interface UpdateNotifierSubscriber {
  id: string;
  callback: () => void;
}

type ChangeTypes = 'category' | 'posts';

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
    if (!this.subscribers.find((sub) => sub.id === listener)) {
      this.subscribers.push({
        id: listener,
        callback: callback,
      });
    }
  }
}
