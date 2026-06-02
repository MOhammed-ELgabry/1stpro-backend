import type { Schema, Struct } from '@strapi/strapi';

export interface CartItem extends Struct.ComponentSchema {
  collectionName: 'components_cart_items';
  info: {
    displayName: 'item';
  };
  attributes: {
    book: Schema.Attribute.Relation<'oneToOne', 'api::book.book'>;
    quantity: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cart.item': CartItem;
    }
  }
}
