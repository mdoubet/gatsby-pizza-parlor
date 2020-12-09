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
  console.log(data);
  // create a page for each pizza
  data.pizzas.nodes.forEach((pizza) => {
    console.log(`creating a page for${pizza.name}`);
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

export async function createPages(params) {
  console.log('Creating Pagessssss');
  // create pages dynamically
  // 1 pizzas
  await turnPizzasIntoPages(params);
  // 2 toppings
  // 3 slice masters
}
