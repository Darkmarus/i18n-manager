export interface ItemModal {
  data?: any;
  component: any;
  instance?: any;
  resolve?: (x?: any) => any;
}

class ModalProvider {
  modals = $state<ItemModal[]>([]);
  new(component: any, data?: any): Promise<boolean> {
    return new Promise((resolve) => {
      const aux: ItemModal = { component, resolve, data };
      this.modals.push(aux);
    });
  }

  remove(item: ItemModal) {
    this.modals = this.modals.splice(this.modals.indexOf(item), 1);
  }
}

export const modalProvider = new ModalProvider();
