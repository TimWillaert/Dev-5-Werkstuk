# Contributing Guidelines

---

## Table of Contents

- [Bug Reporting](#bug-reporting)
- [Suggest new features](#suggest-new-features)
- [Environment and Testing](#environment-and-testing)
- [Pull Request Process](#pull-request-process)
- [Roadmap](#roadmap)

---

## Bug Reporting
If you have encountered a bug, please [open an issue](https://github.com/TimWillaert/Dev-5-Werkstuk/issues/new).
1. Provide a clear title which summarizes the issue.
2. Describe the issue in more detail:
    - Expected behaviour
    - Actual behaviour
    - Steps to reproduce the behaviour
3. Add a screenshot if possible/applicable.
4. Describe a high-level possible fix if you have any idea.

---

## Suggest new features
If you have a suggestion for a new feature, please follow these steps:
1. [Open an issue](https://github.com/TimWillaert/Dev-5-Werkstuk/issues/new) and start the title with **[Suggestion]**.
2. Describe the feature in detail and why it could be useful.

---

## Environment and Testing
To set up your development environment, please follow these steps:
1. Clone this repository.
2. Boot up the Docker container by navigating to the root folder and running the following commands:
    ```shell
    docker-compose build
    docker-compose up
    ```
    If you are unfamiliar with Docker or are encountering issues, please refer to [the Docker documentation](https://docs.docker.com/).
3. If packages seem to be missing, run a clean npm install:
    ```shell
    npm ci
    ```
4. To run tests, navigate to the api folder.
    ```shell
    npm test
    ```
5. If you changed any of the code, make sure all the tests are still passing.
6. If you added new endpoints or made any significant changes, please add new tests to make sure everything works correctly.
    - Test files are located in */api/src/__ tests __*
    - Tests are written with Jest. If you are unfamiliar with Jest or are encountering issues, please refer to [the Jest documentation](https://jestjs.io/docs/en/getting-started).
    - Add your tests in a new test file to keep everything clean and organised.
    - Please provide clear descriptions of your tests.
7. To have a good overview of your local database content, I recommend using a GUI tool such as [TablePlus](https://tableplus.com/). Once installed, follow these steps:
    - Click on *Create a new connection*
    - From the list, select *PostgreSQL*
    - Pick any name, color and tag you like
    - Enter the following credentials:
        - Host: *localhost*
        - Port: *5432*
        - User: *example*
        - Password: *example*
        - Database: *test*
    - Click on *Connect*


---
## Pull Request Process
After having worked **on your own branch**, you might want to open a pull request. If you'd like to do so, please follow these steps:
1. Make sure all your tests are passing.
2. Make sure you added comments where needed to clarify your newly added or changed code.
3. Update the [README.md](README.md) file if necessary.
4. Open a pull request.
    - Provide a clear title which summarizes what you changed or added.
    - Describe the purpose of the pull request. Why do we need these changes?
    - Assign a project author to review your request.
5. If your request is immediately **approved**: Great! We'll reach out to you and discuss whether you'd like to work further on the project.
6. If your reviewer has **requested changes**, please do so and re-open the request. If you disagree with the requested changes, please discuss this in a friendly and professional manner with your reviewer.
7. If your request has been **denied**, your reviewer will provide the reason why. Please keep it friendly and professional.

---

## Roadmap

- Add a user table and authorisation to the endpoints.
- Validate input in endpoints.
- Add documentation/comments to functions and endpoints.