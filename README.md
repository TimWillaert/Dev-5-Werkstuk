# Tickets API

---

## Table of Contents

- [What does it do?](#what-does-it-do)
- [Getting started](#getting-started)
- [How it works](#how-it-works)
    - [Tickets table](#tickets-table)
    - [Organisations table](#organisations-table)
- [Status and roadmap](#status-and-roadmap)
- [Authors](#authors)
- [FAQ](#faq)

---
## What does it do?

The Tickets API allows you to easily create and modify tickets to distribute to your developers. Many similar tools have become overloaded with excess features. This API sticks to the basics so that you can integrate it with other popular tools such as Slack, or develop your own user interface.

---
## Getting started

1. Clone this repository.
2. Navigate to the root folder and boot up the Docker container. For more information regarding Docker, please refer to [their documentation](https://docs.docker.com/).
    ```shell
    docker-compose build
    docker-compose up
    ```
3. To run tests, navigate to the api folder.
    ```shell
    npm test
    ```
4. To see the content in the PostgreSQL database, I recommend using a GUI tool such as TablePlus. You can get it [here](https://tableplus.com/).

---
## How it works

The Tickets API uses two tables to manage its content. Both tables are accessible through their respective CRUD endpoints.

#### Tickets Table

This table is used to save all the tickets. It follows the following structure:

|uuid  |completed|summary |requirements|assigner|assignee|deadline|organisation_id|
|------|---------|--------|------------|--------|--------|--------|---------------|
|*uuid*|*boolean*|*string*|*string[]*  |*string*|*string*|*string*|*string*       |

You can modify this table by using the following endpoints:

- `GET /tickets`
    - Returns all tickets from the database.
- `GET /ticket/:uuid`
    - Returns a specific ticket by uuid.
- `POST /postTicket`
    - Saves a ticket to the database.
    - Requires a body with the following properties: 
        ```js
        {
            completed: Boolean,
            summary: String,
            requirements: String[],
            assigner: String,
            assignee: String,
            deadline: String,
            organisation_id: String
        }
        ```
- `PATCH /updateTicket/:uuid`
    - Updates **one** or **multiple** properties from a stored ticket.
    - Requires a body with the properties you wish to edit. **You do not have to provide all properties**.
        ```js
        {
            assignee: "Tim Willaert",
            deadline: "15/01/2021"
        }
        ```
- `DELETE /deleteTicket`
    - Deletes a specific ticket by uuid.
    - Requires a body which includes the uuid as a string: 
        ```js
        {
            uuid: "babf5fb0-4d18-11eb-864f-f9e4749272ab"
        }
        ```

#### Organisations Table

This table is used to save all the organisations. It follows the following structure:

|uuid  |name    |
|------|--------|
|*uuid*|*string*|

You can modify this table by using the following endpoints:

- `GET /organisations`
    - Returns all organisations from the database.
- `GET /organisations/:uuid`
    - Returns a specific organisation by uuid.
- `POST /postOrganisation`
    - Saves an organisation to the database **Work In Progress**.
    - Requires a body with the following properties: 
        ```js
        {
            name: String
        }
        ```
- `PATCH /updateOrganisation/:uuid`
    - Updates the name of a stored organisation. **Work In Progress**.
    - Requires a body with the updated name:
        ```js
        {
            name: "Erasmushogeschool Brussel"
        }
        ```
- `DELETE /deleteOrganisation`
    - Deletes a specific organisation by uuid.
    - Requires a body which includes the uuid as a string: 
        ```js
        {
            uuid: "cd8eb380-4d17-11eb-9cd9-95082ebd2d3b"
        }
        ```

---
## Status and Roadmap

This project is in development.

---
## Authors

- [Tim Willaert](https://github.com/TimWillaert) 

---
## FAQ

**Q: I'm having trouble setting up my development environment, can you help me?**

A: Please refer to [the contribution guidelines](CONTRIBUTING.md) for more information.

**Q: Can I use this project for commercial or private use?**

A: Yes! This project falls under the MIT License which allows you to do that. For more information, take a look at [the detailed license](LICENSE.md).

**Q: I have another question.**

A: Feel free to contact me at tim.willaert@student.ehb.be.
