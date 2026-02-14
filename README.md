# Frontend Assignment – State Management & Design Exercise

This repository contains a small, intentionally simplified Next.js + Redux example.

The purpose of this exercise is to understand how you reason about state changes, data flow, and maintainability when working with an existing system.

---

## Duration

**45–60 minutes max**

---

## What's provided

- A minimal Next.js app using the App Router
- A Redux slice managing subscriptions
- A mock backend API implemented using Next.js route handlers

---

## API details (important)

The backend API is already implemented and should be treated as **fixed**.

### API code location

/app/api/subscriptions/route.ts

### API URL (when running locally)

/api/subscriptions

### API behavior

- **GET /api/subscriptions**  
  Returns the current list of subscriptions

- **POST /api/subscriptions**  
  Adds a new **active** subscription

- **PATCH /api/subscriptions**  
  Cancels one active subscription (if present)

### Data storage

The data is stored **in memory on the server** (module-level variable).

This means:

- Data resets when the dev server restarts
- It is not persisted in a database
- This is intentional for the purpose of the exercise

Please do **not** modify the API code.

---

## Your tasks (mandatory)

1. Review the existing frontend and state management logic.
2. Add UI controls to:
   - add an active subscription
   - cancel a subscription
3. Ensure the UI state stays consistent with the API responses.
4. Identify and explain any **design or state-related issues** you notice.

**Note:** Please ensure your code is well-documented with clear comments explaining your approach and any complex logic.

---

## Important note

If you do not immediately notice any issues, try adding a way to  
**cancel a specific subscription from the list**.

---

## Guidelines

- Minimal changes are preferred over large refactors.
- There is no single correct solution.
- Please explain _why_ you made the changes you did.
- You may update this README if required to document your changes.

---

## Submission

- Fork this repository and share the link on email.

---

## Improvements

- Have added one button to add a new subscription.
- Have added one Cancel button (next to Add). It cancels the first active subscription. We disable it when there are no active subscriptions and also show this limitation in the UI.
- Have added one button to refresh the list. So user can see the latest list after each action. Which we already refresh after each action, but in case user wants to refresh manually.
- We use a matcher so any thunk in this slice sets loading automatically. Instead of adding loading case for each thunk.
- Instead of hiding the whole page while loading, we disable the buttons and show “Updating…” so while the page is loading the user can still see the list.
- Created common types file, so we can reuse it in other files.

## Issues

PATCH only cancels the first subscription which is active, we cannot pass an id, so we cannot cancel a specific one.

---

## Optional

If you had more time, briefly mention what you would improve next and why.

Improve the UI, right now it is plain HTML with little styling, would improve user experience.
Add error handling (e.g. show a message when the request fails). So that user knows what went wrong and have clarity.
