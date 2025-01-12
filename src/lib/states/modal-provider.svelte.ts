export interface ItemModal {
  id: number;
  data?: any;
  component: any;
  instance?: any;
  resolve?: (x?: any) => any;
}

class ModalProvider {
  modals = $state<ItemModal[]>([]);
  new(component: any, data?: any): Promise<boolean> {
    return new Promise((resolve) => {
      const aux: ItemModal = { id: Date.now(), component, resolve, data };
      this.modals.push(aux);
    });
  }

  remove(item: ItemModal) {
    const indexElement = this.modals.findIndex((x) => x.id === item.id);
    this.modals.splice(indexElement, 1);
  }
}

export const modalProvider = new ModalProvider();
