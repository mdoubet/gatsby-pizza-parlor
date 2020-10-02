import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
  const pizzas = data.allSanityPizza.nodes;
  const { totalCount } = data.allSanityPizza;
  console.log(totalCount);
  console.log(pizzas);
  return (
    <>
      <PizzaList pizzas={pizzas} pizzaCount={totalCount} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery {
    allSanityPizza {
      totalCount
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
          vegetarian
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
