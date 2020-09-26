import { MdLocalPizza as icon } from 'react-icons/md';
import toppings from './toppings';

export default {
  // Computer name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(600).max(4500),
      // TODO add custom component
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'toppings' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      topping4: 'toppings.4.name',
      topping5: 'toppings.5.name',
      topping6: 'toppings.6.name',
      topping7: 'topping.7.name',
      topping8: 'topping.8.name',
      topping9: 'topping.9.name',
    },
    prepare: ({ title, media, ...toppingses }) => {
      console.log(toppingses);

      return {
        title,
        media,
        subtitle: Object.values(toppingses).filter(Boolean).join(', '), // toppings object converted to array, filtered out empty ones
      };
    },
  },
};
