## REST API for TMDB Movies Client

Name: Matul Jain

### Features.

 + Similar Movies:  Get a list of similar movies for a movie. 
 + Recommended Movies:  Get a list of recommended movies for a movie. 
 + Movie Cast: Get a list of credits using a movie ID.
 + Movie Images: Get a list of images for a movie.
 + Languages: Get a list of languages from TMDB.
 + Genres: Get a list of genres from TMBD.
 + Artists: Get a list of popular artists from TMDB.
 + Artist details: Get detailed info for a artist from TMDB.

## Installation Requirements

1. Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed & running on your machine.
2. Install "Dev Containers" extension in Visual Studio Code.
3. In Vs Code, select View -> Command Pallette and run the "Dev Containers: Reopen in Container" command.
4. After running this command, VS Code restarts, and you're now within a dev container
5. Install node modules by running this command from project root level:
  ```bat
  npm install
  ```
  Spin up the dev server using:
  ```bat
  npm run dev
  ```

## API Configuration

Configuration that needs to take place before running the API. 
Create a ``.env`` file at project root level and modify the variables as per your setup as mentioned in [.env.template](https://github.com/matul3jan/ewd-api-labs-2023/blob/master/.env.template)

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=YOUR_TMDB_API_KEY
DATABASE_DIALECT=mongo
DATABASE_URL=mongodb://127.0.0.1:27017/movies_db
TEST_DATABASE_URL=mongodb://127.0.0.1:27017/test_movies_db
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY
```

## API Documentation

Open API 3 Documentation using Swagger - [click here](https://tmdb-client-api.onrender.com/docs/)

Documentation was written in declarative way which is modularised & scalable.

To validate the documentation based on OpenApi Specification, run:
  ```bat
  npm run docs:debug
  ```

To auto generate the documentation (a file openapi.json at project root level), run:
  ```bat
  npm run docs:generate
  ```

## Security and Authentication

Password was encrypted using [Bcrypt](https://www.npmjs.com/package/bcrypt)

All routes are protected using JWT Token Authorization generated based on each user's unique email address value & a secret key.

(Exception: POST: /api/accounts is not a protected route)

## Validation

Mongodb model for Account is validated using Joi - [implementation](https://github.com/matul3jan/ewd-api-labs-2023/blob/master/src/accounts/validators/index.js)

## Testing

Automated Unit testing for API was done using [Jest](https://jestjs.io/) framework.

All tests were written in modularised form, grouped based on context - [tests](https://github.com/matul3jan/ewd-api-labs-2023/tree/master/tests)

Test report - [here](https://tmdb-client-api.onrender.com/test-report)

## API Analytics

API Metrics monitoring dashboard was created using [express-status-monitor](https://www.npmjs.com/package/express-status-monitor)

Analytics Dashboard - [here](https://tmdb-client-api.onrender.com/status)

## Integrating with React App

TMDB Client Front End React Project - [repo link](https://github.com/matul3jan/labMoviesApp)

Example API call from React:
~~~Javascript
export const getMovies = (page) => fetcher(`/api/movies?page=${page}`)
    .then((res) => res.json())
    .then((json) => json);
};
~~~

## Logging

A middleware third party service [winston](https://github.com/winstonjs/winston) was used.

<img width="747" alt="image" src="https://github.com/matul3jan/ewd-api-labs-2023/assets/26350749/cec82cdb-9760-499c-be6a-09c7f8dc655e">

## Deployment

Application was hosted in 2 parts:

1. MongoDb database was hosted on [Mongo Atlas cluster](https://www.mongodb.com/atlas/database)
2. Nodejs Express App (this repo) was hosted on using [Render](https://render.com/)

Live Application Backend (Producer) - https://tmdb-client-api.onrender.com/

Live Application Frontend (Consumer) - https://movies-app-reactjs.vercel.app/
