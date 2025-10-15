# Daily Diet API - Requirements

## Functional Requirements

### User Management
- [ ] User can create an account
- [ ] User can be identified between requests
- [ ] User can only view, edit, and delete meals they created

### Meal Management
- [ ] User can register a meal with the following information:
  - [ ] Name
  - [ ] Description
  - [ ] Date and time
  - [ ] Whether it's within the diet or not
- [ ] User can edit a meal (all information can be modified)
- [ ] User can delete a meal
- [ ] User can list all their meals
- [ ] User can view a single meal details

### Metrics
- [ ] User can retrieve their metrics:
  - [ ] Total number of registered meals
  - [ ] Total number of meals within the diet
  - [ ] Total number of meals outside the diet
  - [ ] Best sequence of meals within the diet

## Business Rules

- [ ] A meal must be associated with a user
- [ ] Users can only manage their own meals
- [ ] All meal fields are required when creating a meal
- [ ] The best sequence is calculated by consecutive meals within the diet
- [ ] Meals must be identified by a unique ID
- [ ] Authentication/identification must persist between requests

## Technical Requirements

- [ ] Use Node.js with Fastify framework
- [ ] Use TypeScript
- [ ] Database should be chosen by the developer
- [ ] Follow REST API best practices
- [ ] Implement proper error handling
- [ ] Add input validation
- [ ] Include automated tests (optional but recommended)

## Non-Functional Requirements

- [ ] Code must be well organized and maintainable
- [ ] Follow clean code principles
- [ ] Use proper HTTP status codes
- [ ] API responses should be in JSON format
- [ ] Implement proper logging
