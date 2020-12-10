import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import stripes from '../assets/images/stripes.svg';

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    padding: 5px;
    background: var(--grey);
    border-radius: 0 0.3rem 0.3rem 0;
    border-style: none none none solid;
    border-image: url(${stripes}) 14;
    box-shadow: 0.1rem 0.1rem 0.3rem var(--black);
    font-size: 1.6rem;

    .count {
      text-decoration-style: double;
      text-decoration-line: underline;
      text-decoration-color: var(--red);
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // if topping exists increment by one
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      }

      // if topping doesn't exist, add it to the acc and set its count to 1
      else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them alphabetically
  const sortedToppings = Object.values(counts).sort((a, b) => {
    const x = a.name.toLowerCase();
    const y = b.name.toLowerCase();
    return x > y ? 1 : -1;
  });
  return sortedToppings;
}

export default function ToppingsFilter() {
  // get array of toppings and array of pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  console.clear();
  // Count how many pizas have each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log(toppingsWithCounts);
  // Display the toppings with count of pizzas the topping is on

  // link the toppings to filter the grid
  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  );
}
