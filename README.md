# CoLab

On online collaberation platform for passion projects.

**Temporary Link**: https://codecause-3c5af.web.app/projects

## Motivation:

I wanted an online platform where I could find like-minded individuals who are there specifically to build passion projects. While Open Souce mostly does this with creating new tools and products for developers, I wanted to bring this spirit outside of the world of code. People should be able to find work (profit or non-profit) related to what they are interested in.

I couldn't find a social platform that did this well, so I began work on my own.

## Build Status:

Proof of concept.

This is the first proof of concept and testing stage of the project. I'm looking to show the project to other developers, designers, community managers etc, and get some feedback. I'd also be interested in teaming up with the right individuals. Send me message if you're interested.

The site is 'live', but all the data is just dummy data. The functionality really only covers the meeting up aspect of the platform. Eventually, the site should allow users to 'build out' features they need to run the project on the platform, as well as a legal document builder for equity share agreements, NDA's, etc. The ultimate goal is to create a place where people can work on the things they really care about, and perhaps even have it be their career/business.

Much still needs to be done before that point however.

## Tech:

Becuase of the massive package size of Firebase, I tried to keep the packages as minimalistic as possible.

- Create React App (Hooks, Context),
- Styled Components,
- React Router,
- Firebase Auth,
- Firestore (NoSql),
- date-fns.js

## Features:

- The user can sign up and login using the simple Firebase Auth system
- The site has autologin for users who have valid accounts

### Browsing

- They can browse a listing of projects, each with a link to a project page,
- They can search for projects using categorized tags
  - Solutions: Type of project they are looking to work on (ex. Web App, database)
  - Skills: Type of skills that the projects require. These can be technical or non-technical (Javascript, Figma, Technical Writer, Web Developer)
  - Cause: The cause that the project is dedicated to. These can be humanitarian or environmentally focused, or something as simple and mercenary as 'making money'. As long as people are transparent about their motivations.
- The user can combine tags from different sections to perform a complex query.
- There is also a string search, but it really sucks. I'm waiting to refactor to Firebase Serverless FN's to overhall the string search system.

### Interacting with other users

- Any user can leave comments on any project.
- Any user can send direct messages to another user
- Every user has an inbox for alerts and direct messages
- Users can reply to Direct Messgages
- Users can delete messages or alerts in their inbox
- Any user can send feedback to the CoLab team (just me at the moment)
- Any user can 'like' a project once, or remove their like
- Any user can see 5 of the people who have also liked the project by hovering over the button

### Creating a Project

- Any user can create a project using a multi-step form that asks essential questions about their project idea.
- The data collected from that form populates a rough whitepaper for their project page.
- Items on that whitepaper can be rearranged, deleted, created, edited. Tags, and titles cannot (yet).
- Users can leave comments below the project. Project creator and other users are free to reply. Replies are infinite (similar to Reddit)
- Projects that the user has created are listed on their side display (or drawer for mobile).
- All projects come with a 'Members Only' Project Dashboard

### Contributing to Projects

- If another user wants to join a project, they can click 'apply'. The app directs the user to a multistep form application process. The questions are boilerplate at the moment. In the future, the project creator will be able to customize their application questions.
- The application gets sent to the project creator, who recieves an alert in their project Dashboard.
- If the Creator of the project accepts the application, the contributor is free to enter the 'Member's Only' Project Dashboard.
- Unfortunately, that also means that they can do everything that the Creator can do (Creators cannot be deleted, however). User generated roles will definitely be updated in a future release.

### Managing Your Project

- Users can log in to their Project's dashboard
- The dash displays project alerts and applications that are pending, accepted, or denied
- The project creator can accept or decline applications. They can also reply to the applicant for additional questions.
- Project creator can remove contributors from the project
- Project creator can edit the body section of the whitepaper

## Limitations:

- No password recovery or email verification yet.
- Tag Data and the project title cannot be altered or edited as of yet.
- Application multi-step forms for projects are not customizable.
- Editing a project's white paper is sort of clumsy at the moment. In the future, there will be a Markdown editor that users can freely edit their projects with.
- No pagination on the listing yet. Figured I would wait until there is data and/or users.
- Client-side Firestore queries are mindbendingly messy. I will refactor server fns and create triggers to endure consistent data across NoSQL database trees.
- No testing on the app. I will integrate tests for each feature of the app soon before production.
- Security scheme is non-existant. I will create security rules, backend validation with serverless fns, backend tests, error reporting, continuous integration before CoLab is production ready.
- There are accessibility problems on the frontend. I will work to resolve all of them over time.
- I need to have a long think and cosultation with CoLab friends about the platform's user policy. I also need to refine the business model and put it in a place for all to see.

## Big Dreams:

This site can only make the connection between the creator and contributor at the moment, but that is only a small part of the story. As stated above, this shouldn't only be a place where people just join or start projects, but also see them through. CoLab should be the central hub that connects a project's Patreon with their GitHub with their Google Docs with a Trello board with...you get the point. It should have its own software that the Creators can use to build their project out.

Not only that but the boilerplate legal contracts might be a great way to create equitable foundations for for-profit startup endevours.

However, the features will be driven by what the Creators and Contributors need, and in the priority they see fit. I want as much feedback from productive users as possible.

## Focus First:

CoLab is a focus-first platform, which means that it's goal and main mission is to have the user focus on the things they care about, as opposed to advertising. The user should be able to control every notification, how they recieve it and when. From community, to design, to code, everything will designed with focus in mind.

## Voting, Reputation, and Possibly Crypto

In my mind, there are **three main problems** related to the modern vote system on most social platforms.

**They are infinite**. People should only be able to like things they really care about. If votes were finite, the amount of likes given to a project or user would mean more than some off-the-cuff shrug. In real life, people only have so many fucks to give. It should be the same for likes. My idea for solving this problem would be issuing one like to each user. They're free to give that like to whatever project they please. After that, users will have to earn likes.

They can do that either by spending the likes others have spent on them or their projects OR they can recieve bonus likes CoLab in the form of awards. We can also introduce competitions, hackathons, contests, etc. Contributors recieve likes or votes from project creators for finishing tasks.

**Likes don't mean anything**. On most platforms, how many likes a user has really doesn't mean much at all. I want project Creators to be able to develop a cautious trust with users who have a good reputation. With finite likes that are immutable, users can get a more accurate sense of a contributor's or creator's drive and experience. This helps users place bets (their time and energy) on projects and contributors that are more likely to succeed.

**Distracting slot machine mechanics**. In a system where likes are infinite, and given away without a second thought, users try to game the system by farming likes. They can do this by creating cheap content that generates cheap reactions and starting the process over and over again. In most cases, this has become a major distraction from the main purpose of these apps. Promoting this antiquated feature on CoLab would go against its Focus-first principles. Users on CoLab are rewarded for putting their head down and acting on their ambitions.

Crypto: Crypto seems like a great way to solve bring about this feature on CoLab, due to its strict security and immutability. However, buying and selling reputation seems like a bad way to devalue what the vote would represent. This is a tricky design challenge that will need to be worked out over time.

## Known bugs:

- non-breaking unicode string in tags causes %E2%80%91 in react router search. Will create a higher order search context to handle search params instead of react router since both search and state options have proven unreliable.
- the drawer backdrop button flickers on page change in mobile.
- String search in the listing flat-out sucks. This will be refactored with the backend refactor coming up soon.
- Contributors are given full access to the project they are accepted on. This will not do for real world projects. A role system is

## Special Thanks:

- Thanks to Dan R Design for the sleek design system. I never knew just how important an organized, rigorous approach to design was until I saw the benefits. Much appreciated.
- Thanks to Daniel Lew for helping me flesh out the idea in the early stages. Hoping to work with you one day on this again!
