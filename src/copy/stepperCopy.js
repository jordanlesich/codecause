export const createProjectBrief = {
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
export const createProjectError = {
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

export const createProjectSuccess = {
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
export const makeCreateProjectError = (id) => {
  const code = id || "No ID was sent. Contact the CoLab team.";
  return {
    titleParagraph: {
      title: "Error Submitting Project",
      body: `Looks like there was an error submitting the project to the server. 
      This could be because of a bad internet connection. 
      If not, an error report has already been sent to the server.`,
    },
    restParagraphs: [
      {
        heading: "Connected to the internet? ",
        body: `Most of the time, this is becuase of a faulty internet connection. If the internet is restored, feel free to try again.`,
      },
      {
        heading: code,
        body: `If you are connected to the internet, save your project and send an error report, copy the ID above and save it somewhere safe. 
                If your project hasn't been restored within a few days, send the CoLab team a message with the ID.`,
      },
    ],
  };
};

export const applyBrief = {
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
export const applyError = {
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

export const applySuccess = {
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
