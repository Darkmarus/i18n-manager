export interface ItemModal<R = any> {
  id: number;
  component: any;
  resolve: (value: R) => void;
  instance?: any;
  data?: any;
}

class ModalProvider {
  modals = $state<ItemModal[]>([]);
  new<R = [boolean]>(component: any, data?: any): Promise<R> {
    return new Promise((resolve) => {
      const aux: ItemModal<R> = {
        id: Date.now(),
        component,
        resolve,
        data,
      };
      this.modals.push(aux);
    });
  }

  remove(item: ItemModal) {
    const indexElement = this.modals.findIndex((x) => x.id === item.id);
    this.modals.splice(indexElement, 1);
  }
}

export const modalProvider = new ModalProvider();
