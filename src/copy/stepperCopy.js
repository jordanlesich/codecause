export const introStepperCopy = {
  titleParagraph: {
    title: "Create a Project",
    body: `At Colab, starting a project is sacred. To attract contributors, you'll need to lead by example. Prove that you're worthy by being the hardest worker on your team.`,
  },
  restParagraphs: [
    {
      heading: "Sell Your Idea",
      body: `As you go create your project, think of what inspires you about the project. Provide succinct, but interesting descriptions.`,
    },
    {
      heading: "Be Prepared",
      body: `Your idea could snowball fast. Make sure you're prepared.`,
    },
  ],
};
export const stepperErrorCopy = {
  titleParagraph: {
    title: "Ah Shit!",
    body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit quod nobis sunt, eos, eveniet qui quisquam illo 
          voluptatibus tempora laudantium nulla veniam quos. Amet aperiam illum
          repellendus dolore.`,
  },
  restParagraphs: [
    {
      heading: "This is a heading",
      body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit quod nobis sunt, eos, eveniet qui quisquam illo 
          voluptatibus tempora`,
    },
    {
      heading: "This is a heading",
      body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit`,
    },
  ],
};
export const loadingCopy = {
  titleParagraph: {
    title: "Instert paragraph here",
    body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit quod nobis sunt, eos, eveniet qui quisquam illo 
          voluptatibus tempora laudantium nulla veniam quos. Amet aperiam illum
          repellendus dolore.`,
  },
  restParagraphs: [
    {
      heading: "This is a heading",
      body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit quod nobis sunt, eos, eveniet qui quisquam illo 
          voluptatibus tempora`,
    },
    {
      heading: "This is a heading",
      body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit`,
    },
  ],
};
export const stepperSuccessCopy = {
  titleParagraph: {
    title: "It's On Now",
    body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit quod nobis sunt, eos, eveniet qui quisquam illo 
          voluptatibus tempora laudantium nulla veniam quos. Amet aperiam illum
          repellendus dolore.`,
  },
  restParagraphs: [
    {
      heading: "This is a heading",
      body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit`,
    },
    {
      heading: "This is a heading",
      body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Odio accusamus fugit`,
    },
  ],
};
export const makeStepperErrorCopy = (id = "Sorry, no trace ID found") => {
  return {
    titleParagraph: {
      title: "Error Submitting Project",
      body: `Looks like there was an error submitting the project to the server. 
      This could be because of a bad internet connection. 
      If not, an error report has already been sent to the server.`,
    },
    restParagraphs: [
      {
        title: id,
        msg: `Copy the above code and save it somewhere safe. If your project hasn't been restored 
        within a couple days, send us a message on the feedback page.`,
      },
      {
        title: "Can't wait?",
        body: `Feel free to head over to feedback and let us know. We'll try to get your project up and running as soon as possible.`,
      },
    ],
  };
};
