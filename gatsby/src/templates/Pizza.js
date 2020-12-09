import React from 'react';
import { graphql, Link } from 'gatsby';

import Img from 'gatsby-image';
import styled from 'styled-components';

export default function SinglePizzaPage({ data: { pizza } }) {
  {
    console.log('pizza ', pizza);
  }
  return (
    <main>
      <h2 className="mark">
        {pizza.name}{' '}
        {pizza.toppings.reduce((veg, top) => veg && top.vegetarian, true) &&
          '🌱'}
      </h2>
      ;<p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </main>
  );
}

// dynamic query based on the slug passed in via constext in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
