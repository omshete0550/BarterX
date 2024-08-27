import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function AccordianComponent() {
  const answer1 =
    "Begin by exploring our wide range of products. Use our search and category filters to easily find what you're looking for.";
  const answer2 =
    "Click on the products you're interested in to view detailed information, including prices, specifications, and customer reviews. You can also add items to your cart as you go.";
  const answer3 =
    "Once you've added all your desired items to the cart, proceed to checkout. Follow our simple and secure checkout process to enter your shipping and payment information.";
  const answer4 =
    "Sit back and relax! We'll take care of the rest. Your order will be carefully packed and delivered to your doorstep. If you have any questions or need assistance, our customer support team is here to help.";
  return (
    <Accordion
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: "auto",
            transition: {
              height: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: "ease",
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
              height: {
                easings: "ease",
                duration: 0.25,
              },
              opacity: {
                easings: "ease",
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="How can I start exploring the products on your website?"
      >
        {answer1}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        title="How do I view detailed information about a product?"
      >
        {answer2}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Accordion 3"
        title="How do I proceed to checkout after selecting my items?"
      >
        {answer3}
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Accordion 4"
        title="What happens after I place an order?"
      >
        {answer4}
      </AccordionItem>
    </Accordion>
  );
}
