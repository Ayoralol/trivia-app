# Trivia Game!

- Setup API calls
- Make homepage with login/start
  - start prompts a login or "play as guest" (only if not logged in already)
- Make form for game start detailing difficulty/subject/etc..
- Make game interface

  - "Timer" for each question (a bar that scrolls down?)
  - The question
  - how are the answers displayed?

- Have a "survival" Gamemode that will keep generating questions until one is wrong, giving x time per question
- Have a "Timeattack" gamemode that will give 15 questions and a timer for the whole game, your score is based off the amount answered and how much time is left over

- User is able to try the failed questions again, which will remove the relation from their incorrect_mc or incorrect_tf and add it to correct_mc/correct_tf

## Layout

- home page with a Login and Start Game
  - Login is not required, but will save your points if you log in
  - When starting without being logged in, it will display the end score but not save anything to an account
  - Answering a question will add it to the DB with the ID as the question ID and keep all the details of it
  - When logged in, answered questions will be linked to the questions table to display that users answered questions
  - you will also be able to see questions that user answered wrong

### Category ID's

- 9 - General Knowledge
- 10 - Entertainment: Books
- 11 - Entertainment: Film
- 12 - Entertainment: Music
- 13 - Entertainment: Musical & Theatres
- 14 - Entertainment: Television
- 15 - Entertainment: Video Games
- 16 - Entertainment: Board Games
- 17 - Science & Nature
- 18 - Science: Computers
- 19 - Science: Mathematics
- 20 - Mythology
- 21 - Sports
- 22 - Geography
- 23 - History
- 24 - Politics
- 25 - Art
- 26 - Celebrities
- 27 - Animals
- 28 - Vehicles
- 29 - Entertainment: Comics
- 30 - Science: Gadgets
- 31 - Entertainment: Japanese Anime & Manga
- 32 - Entertainment: Cartoon & Animations
