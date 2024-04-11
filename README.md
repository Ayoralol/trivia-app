# Trivia Time!

#### To Fix and Add Before Deploying

TODAY

- Mobile site creation + Scalability to desktop
- Create Logo
- Implement "Lifetime Points" and correlate that to a level

##### Frontend

- App wide toast notifications
- stay logged in on refresh?
- Add form validation
- Make game elements into a different components to make it more reuseable

##### Backend

- Fix optional UpdateUserDTO parameters so it isnt done only in the frontend
- add user fields validation
- Proper security for users
- Questions table
- Add failed questions to user so they can re-attempt them

## Work Log

### April 11

- Added Tick/Cross for correct or incorrect answers `QResult`
- Added 0.01x Multiplier per second remaining for Time Attack
- Changed Time Attack Timer from 6sec per Q => 10sec per Q
- Stated Look re-do starting with Mobile view

### March 28

- De-bugged Survival (Break Problems, Game ending on 1 life)
- Made Time-Attack gamemode
- Made Free-Play gamemode
- Added select boxes to Free-Play to choose category and difficulty
- Fixed more backend problems (Null updateUser parameters overwriting instead of being ignored)
- Basic Stylings for entire project
- Added new user capability

### March 27

- Made working Survival game (without timer)
- added db highscore updating on survival completion
- Added HTML decode functionality for questions and answers
- Implemented survival timer per question

### March 26

- Reverted back to just MySQL db instead of Azure db
- Once again troubleshooting 401 errors
- Found temporary fix to the backend/db 401 errors - need to fix the backend to deal with insecurity
- added working login functionality using context
- Started actual frontend designing

### March 21

- setup docker to create an image of the frontend
- Attempted to troubleshoot 401 errors accessing the backend

### March 20

- Linked backend to Azure db and tested with postman
- Debugged backend endpoints and file structure
- finally pushed to github as an actual project
- Set up password hashing and login on backend
- Set up frontend services to connect to the backend
- Started file structure of frontend components/containers/pages

### March 19

- Setup files for front and backend
- Made some calls and notes for the trivia API on the frontend
- Setup simple backend for single table
- started link to Azure db
