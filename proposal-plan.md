# Game Backlog and Progress Tracker API

## Project Concept
The tracker is a RESTful API that serves as a back-end service for users to manage their video game library.
In this day and age, there's many different consoles and people have hundreds to thousands of games, and they
lose track of them easily. Personally, I have games both on PC and on Nintendo Switch that I struggle to keep
track of and I'm always starting games, playing them for an hour or two, and then I forget about them.
I also lose track of games I want to play but have yet to purchase or download. Users will be able easily
keep track of their gaming by cataloging games, tracking their play status (e.g., how many hours, what system,
how far they got, etc.) and be able to write reviews or notes and comments about their experience,
their thoughts, or the gameplay.

## Scope and Functionality
- Users, games, backlog entries, and reviews/comments.
- Users will be able to input their game of choice along with the platform they play on and other information. (Title, genre, franchise)
- Users will be able to authenticate themselves with profile management via Firebase Auth
- Users will be able to keep track of their own personal entries, being able to get all their entries, get one entry, create an entry, update an entry and delete an entry

## Planned Endpoints
- `GET /api/v1/entries` - Get all entries
- `GET /api/v1/entries/:id` - Get a specific entry by ID
- `POST /api/v1/entries` - Create a new entry
- `PUT /api/v1/entries/:id` - Update an existing entry by ID
- `DELETE /api/v1/entries/:id` - Delete an existing entry by ID

### New, recently added endpoints for reviews and wishlist
- `GET /api/v1/reviews` - Get all reviews
- `GET /api/v1/reviews/:id` - Get a specific review by ID
- `POST /api/v1/reviews` - Create a new review
- `PUT /api/v1/reviews/:id` - Update an existing review by ID
- `DELETE /api/v1/reviews/:id` - Delete an existing review by ID
- `GET /api/v1/wishlist` - Get all wishlist entries
- `GET /api/v1/wishlist/:id` - Get a specific wishlist entry by 
- `POST /api/v1/wishlist` - Create a new wishlist entry
- `PUT /api/v1/wishlist/:id` - Update an existing wishlist entry by ID
- `DELETE /api/v1/wishlist/:id` - Delete an existing wishlist entry by ID

## Course Alignment
| Requirement | How It Is Met |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 4   | Cell 5   |