import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // create a page for each pizza
  data.pizzas.nodes.forEach((pizza) => {
    console.log(`creating a page for ${pizza.name}`);
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // get a template for the page
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // createPage for each topping
  data.toppings.nodes.forEach((topping) => {
    console.log(`Creating page for topping ${topping.name}`);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
  // Pass topping data to pizza.js
}

export async function createPages(params) {
  console.log('Creating Pagessssss');
  // create pages dynamically

  await Promise.all([
    // 1 pizzas
    turnPizzasIntoPages(params),
    // 2 toppings
    turnToppingsIntoPages(params),
  ]);
  // 3 slice masters
}
