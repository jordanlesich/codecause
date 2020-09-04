const onlyQAFrames = (steps) => {
  return steps.map((step) => {
    return {
      tag: step.tag,
      QA: step.frames.find((frame) => frame.tag),
    };
  });
};
const mapSingleQA = (step) => {
  const { type, question } = step.QA;
  return {
    tag: step.tag,
    type,
    question,
    answer: "",
    completed: false,
  };
};
const mapMultiQA = (step) => {
  const { type, questions } = step.QA;
  return {
    tag: step.tag,
    type,
    questions,
    answers: questions.map((question) => ""),
    completed: false,
  };
};

export const createStepperData = (instructions) => {
  if (!instructions) console.error("Did not recieve valid instructions");
  const stepData = onlyQAFrames(instructions);
  return stepData.map((step) => {
    if (step.QA.type === "singleQA") return mapSingleQA(step);
    if (step.QA.type === "multiQA") return mapMultiQA(step);
    else {
      console.error("Step doesn't have a valid QA frame");
      return null;
    }
  });
};

export const instructions = [
  {
    tag: "Q0",
    frames: [
      {
        type: "message",
        title: "Starting a Project on Code Cause",
        subTitle: "Here's what you need to know",
        body: {
          type: "list",
          strings: [
            "You're about to post your project idea to a public listing online",
            "Anyone can read that listing",
            "The idea is to inspire developers (aspiring or otherwise) to help you make something.",
            "Which means that CodeCause is best suited for Open Source or charitable causes",
            "The projects can be small -- perhaps you need a database for a research project",
            "The projects can also be big -- maybe you want to build a platform to help frontline workers",
            "All you need to do is fill out this questionnaire and your project joins the CodeCause listing",
            "If you're ever confused about what a question is asking you, click the '?' icon",
            "People have short attention spans. Keep your answers as short as possible.",
          ],
        },
      },
      {
        type: "singleQA",
        title: "The Name",
        hideTitle: true,
        question: "What's your project's name",
        tag: "Q0",
        details:
          "A good name is short, catchy, and describes the project well.",
        help: "Don't overthink it. You can always change the name later.",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q1",
    frames: [
      {
        type: "singleQA",
        title: "The Pitch",
        question: "Give us the Elevator Pitch.",
        details: "Describe your idea in a sentence.",
        tag: "Q1",
        help:
          "If you can't describe your idea in one sentence, it's likely too complicated. Try to get to the core of what the idea is.",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q2",
    frames: [
      {
        type: "singleQA",
        title: "The Problem",
        question: "What problem needs solving?",
        details:
          "In a brief paragraph, describe what problem you aim to solve by making this project",
        tag: "Q2",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q3",
    frames: [
      {
        type: "singleQA",
        title: "The Solution",
        question: "What's the Solution?",
        details:
          "If you can describe the solution, do so in a short paragraph. If you can't, no problem. Just write, 'needs consultation'",
        help:
          "It's ok to not know the solution right away. Often experts will have a more thorough solution.",
        tag: "Q3",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q4",
    frames: [
      {
        type: "singleQA",
        title: "Your Experience (TODO: RADIO OUTPUT FROM 1-10?)",
        question:
          "What kind of experience do you have working with developers?",
        details:
          "It's ok if you don't have any experience, it helps the contributors know what to expect from you.",
        help:
          "1 = you have no idea how to solve this problem, 10 means you know exactly how to solve the problem, you just need help.",
        tag: "Q4",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q5",
    frames: [
      {
        type: "singleQA",
        title: "The Finished Project",
        question: "What's the Minimum Viable Product?'",
        details: "At what point do you consider the project completed.",
        help:
          "This helps us get an idea of an endpoint to your project. Some projects could also have multiple endpoints.",
        tag: "Q5",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q6",
    frames: [
      {
        type: "singleQA",
        title: "Cause Tag",
        question: "What's your cause tag?",
        details:
          "Choose a tag that describes your project's cause, or create your own",
        help:
          "Cause tags help devs who are looking to work on a specific cause find your project.",
        tag: "Q6",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q7",
    frames: [
      {
        type: "singleQA",
        title: "Solution Tag",
        question: "What sort of technology will help your cause?",
        details:
          "Choose a tag that describes your project's solution, or create your own. If you don't know the solution, that's ok. Just type 'consultation'.",
        help:
          "Solution tags tell developers what type of project they will be working on, ex. 'Web app'.",
        tag: "Q7",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q8",
    frames: [
      {
        type: "singleQA",
        title: "Skill Tags",
        question: "What sort of skills are you looking for? (10 max)",
        details: "If you don't know that's ok. Just type 'consultation'.",
        help:
          "Cause tags help devs who are looking to work on a specific cause find your project.",
        tag: "Q8",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q9",
    frames: [
      {
        type: "singleQA",
        title: "The Nitty Gritty",
        question: "Describe any details you'd like",
        details:
          "Run wild. Add anything you think someone will want to know if they're helping with this project.",
        help: "Just details. That's all.",
        tag: "Q9",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
      {
        type: "results",
        title: "Your Project",
        question: "Does all this look ok?",
        details: "Check everything over to make sure you have everything down.",
      },
    ],
  },
];
