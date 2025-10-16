# Daily Diet API - Requirements

## Functional Requirements

### User Management
- [x] User can create an account
- [x] User can be identified between requests
- [x] User can only view, edit, and delete meals they created

### Meal Management
- [x] User can register a meal with the following information:
  - [x] Name
  - [x] Description
  - [x] Date and time
  - [x] Whether it's within the diet or not
- [x] User can edit a meal (all information can be modified)
- [x] User can delete a meal
- [x] User can list all their meals
- [ ] User can view a single meal details

### Metrics
- [ ] User can retrieve their metrics:
  - [ ] Total number of registered meals
  - [ ] Total number of meals within the diet
  - [ ] Total number of meals outside the diet
  - [ ] Best sequence of meals within the diet

## Business Rules

- [x] A meal must be associated with a user
- [x] Users can only manage their own meals
- [x] All meal fields are required when creating a meal
- [ ] The best sequence is calculated by consecutive meals within the diet
- [x] Meals must be identified by a unique ID
- [x] Authentication/identification must persist between requests

## Technical Requirements

- [x] Use Node.js with Fastify framework
- [x] Use TypeScript
- [x] Database should be chosen by the developer
- [x] Follow REST API best practices
- [x] Implement proper error handling
- [x] Add input validation
- [ ] Include automated tests (optional but recommended)
