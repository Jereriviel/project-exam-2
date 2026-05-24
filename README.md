# Project Exam 2

![image](https://jereriviel-pe2-holidaze.netlify.app/holidaze_thumbnail.webp)

## Goal

The project demonstrates skills learnt over the past two years. The final product should reflect the candidate’s general development capabilities and visual and technical skills.

## Description

Develop a modern frontend for the accommodation booking application "Holidaze". Feature requirements and official Noroff API documentation are provided, but design and UX are up to you.

### Feature requirements

#### Public

- View a list of Venues.
- Search for a specific Venue.
- View a Venue page by ID.
- Register as a Customer or Venue Manager (stud.noroff.no email).
- View a calendar with available and booked dates.

#### Authenticated Customer

- Log in and log out.
- Create a booking.
- View upcoming bookings.
- Update avatar/profile picture.

#### Authenticated Venue Manager

- Log in and log out.
- Create, edit, and delete a Venue.
- View upcoming bookings for the Venues they manage.
- Update avatar/profile picture.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- React Helmet

## UI & UX Libraries

- React Toastify – For displayimg toast notifications for user feedback
- React DayPicker - For the calendar the component
- Headless UI – For fully accessible and customizable UI components
- Material UI - For the pagination component

## Form Handling

- React Hook Form - For form state management
- Zod -For schema-based validation integrated with React Hook Form

## Data Fetching

- Tanstack Query - For handeling server state, data fetching, caching, and loading/error states

## Installing

1. Clone the repo:

```bash
git clone https://github.com/Jereriviel/project-exam-2.git
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file based on .env.example

```bash
VITE_API_BASE_URL="https://v2.api.noroff.dev"
VITE_API_KEY=your_actual_api-key_here
```

4. Start the local dev server:

```bash
npm run dev
```

5. Build the project for production:

```bash
npm run build
```

## Linting and Formatting

Run Prettier:

```bash
npm run format
```

Run ESLint:

```bash
npm run lint
```

## Pre-Commit Hooks with Husky

Husky is configured to automatically check linting and formatting before each commit:

```bash
npm run prepare
```

## Deployment

This site is deployed using Netlify: [https://jereriviel-js-frameworks.netlify.app/](https://jereriviel-pe2-holidaze.netlify.app/)

## Contact

If you have any questions or feedback, feel free to contact me on [LinkedIn](www.linkedin.com/in/carina-mariell-pedersen-2a8648403).
