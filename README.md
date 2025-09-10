

# Expanders360 API

This project is a Nest.js API designed to match vendors with specific projects based on predefined criteria. It uses a clean architecture with a relational database (MySQL) and a document database (MongoDB) for different data types.

## 🚀 Setup & Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* [**Docker**](https://www.docker.com/get-started) and [**Docker Compose**](https://docs.docker.com/compose/install/) are required to run the application and its databases.

### Steps

1. **Clone the Repository:**

```

git clone \<your-repository-url\>
cd \<your-project-directory\>

```

2. **Create the `.env` file:**
Create a file named `.env` in the root of your project and add your database credentials.

```

# MySQL database config
DATABASE_TYPE='mysql'
MYSQL_HOST='localhost'
MYSQL_PORT=3306
MYSQL_USER='root'
MYSQL_ROOT_PASSWORD='root'
MYSQL_DATABASE='expanders360'

# Mongodb database config
MONGO_URI=mongodb://root:root@localhost:27017/
MONGO_ROOT_USERNAME='root'
MONGO_ROOT_PASSWORD='root'
MONGO_ROOT_PORT=27017
MONGO_ROOT_HOST='mongodb-db'
# Azure
AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING=endpoint=https://cvhat-email-service.unitedstates.communication.azure.com/;accesskey=BLPrBWSAPcebQUhJ4rxQlspK2C1VqFf2xfjTzYxLaToInpQ4Obm2JQQJ99BCACULyCpHULG7AAAAAZCSggFl
AZURE_EMAIL=DoNotReply@a8038289-44d9-4d6e-8a12-60a9e1da4e44.azurecomm.net

# Server
SERVER_HOST=localhost
SERVER_PORT=3000

```

3. **Start the Services:**
Use Docker Compose to build and start the application and database containers. The command includes a script that waits for the databases to be fully ready before starting the application.

```

docker compose up --build

````

4. **Access the API:**
Your API will be running on `http://localhost:3000`.

## 📊 Schema Diagrams

The application uses a hybrid database approach with both MySQL (for relational data) and MongoDB (for unstructured data).

### Relational Schema (MySQL)

The core relational data is structured as follows:

* **Project**: Represents a project with a unique ID and various properties.

* `id` (primary key)

* `title`

* `services_needed`

* `counry` 

* `budget`

* `status`

* `user_id`

* **Vendor**:

* `id` (primary key)

* `name`

* `email`

* `countries_supported`

* `services_offered`

* `rating`

* `response_sla_hours`

* `status`

* **Match**: This is a junction table that establishes the many-to-many relationship between `Project` and `Vendor`.

* `id` (primary key)

* `project_id` (foreign key to `Project`)

* `vendor_id` (foreign key to `Vendor`)

* `score` (the calculated score from the matching formula)

* `status`

### MongoDB

MongoDB stores unstructured data, such as a vendor's detailed portfolio, unstructured notes, or other information that doesn't fit neatly into the relational model.

## 📋 API Endpoints

---
title: expanders360
language_tabs:
- shell: Shell
- http: HTTP
- javascript: JavaScript
- ruby: Ruby
- python: Python
- php: PHP
- java: Java
- go: Go
  toc_footers: []
  includes: []
  search: true
  code_clipboard: true
  highlight_theme: darkula
  headingLevel: 2
  generator: "@tarslib/widdershins v4.0.30"

---

# expanders360

Base URLs: http://localhost:3000

# Authentication

- HTTP Authentication, scheme: bearer

# auth

## POST signup

POST /auth/signup

> Body Parameters

```json
{
  "email": "user10@gmail.com",
  "password": "123456789",
  "companyName": "company"
}
```



> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "Sing up successfully",
  "data": {}
}
```

> 400 Response
>
 ```json
{
"message": "Email already exists",
"error": "Bad Request",
"statusCode": 400
}
```

## POST signin

POST /auth/signin

> Body Parameters

```json
{
  "email": "user1@email.com",
  "password": "123456789"
}
```
> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "Sign In successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTc1NzUxNTEzMCwiZXhwIjoxNzYwMTA3MTMwfQ.TLKScaLqXIkfLo0M41jVlt_PaUt-zdvBRWdb4JqvqPI"
  }
}
```

> 400 Response

 ```json
{
  "message": "Invalid credentials",
  "error": "Bad Request",
  "statusCode": 400
}
```

## GET get profile

GET /auth/profile

> Response Examples

> 200 Response
```json
{
    "status": 200,
    "message": "Profile",
    "data": {
        "id": 10,
        "companyName": "uplancer",
        "contactEmail": "user@gmail.com",
        "role": "client"
    }
}
```

> 401 Response

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```


# project

## POST create project

POST /project

> Body Parameters

```json
{
  "title": "project 1",
  "servicesNeeded": [
    "AI Integration",
    "e-commerce"
  ],
  "country": "USA",
  "budget": 10000.6
}
```

> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "create project",
  "data": {}
}
```


## GET get projects

GET /project

> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "projects retrieved",
  "data": [
    {
      "id": 11,
      "title": "Project Title 11",
      "servicesNeeded": [
        "Frontend"
      ],
      "country": "Japan",
      "budget": 21628,
      "status": "active"
    }
  ]
}
```


# vendor

## POST create vendor

POST /vendor

> Body Parameters

```json
{
  "name":"xyz vendor",
  "email":"vendor@vendor.com",
  "countriesSupported":["USA"],
  "servicesOffered":["delivery","e-commerce"],
  "rating":100,
  "responseSLAHours":500
}
```

> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "vendor created",
  "data": {
    "name": "xyz vendor",
    "email": "vendor@vendor.com",
    "countriesSupported": [
      "USA"
    ],
    "servicesOffered": [
      "delivery",
      "e-commerce"
    ],
    "rating": 100,
    "responseSLAHours": 500,
    "id": 11
  }
}
```



## GET get vendors

GET /vendor

> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "vendors retrieved",
  "data": [
    {
      "id": 1,
      "name": "Vendor 1",
      "email": "yussef.msabeh@gmail.com",
      "countriesSupported": [
        "USA",
        "Brazil",
        "Canada"
      ],
      "servicesOffered": [
        "AI Integration"
      ],
      "status": "active",
      "rating": 4,
      "responseSLAHours": 22
    }
  ]
}
```


# match

## POST create match

POST /match/:projectId

> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "match created",
  "data": {}
}
```

## GET get matches

GET /match/:projectId

> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "matches retrieved",
  "data": [
    {
      "id": 4,
      "score": 14,
      "status": "pending",
      "createdAt": "2025-09-10T10:39:43.000Z",
      "updatedAt": "2025-09-10T10:39:43.000Z",
      "project": {
        "id": 11,
        "title": "Project Title 11",
        "servicesNeeded": [
          "Frontend"
        ],
        "country": "Japan",
        "budget": 21628,
        "status": "active"
      },
      "vendor": {
        "id": 2,
        "name": "Vendor 2",
        "email": "yussef.msabeh@gmail.com",
        "countriesSupported": [
          "Canada",
          "Japan"
        ],
        "servicesOffered": [
          "Mobile App"
        ],
        "status": "expired",
        "rating": 1,
        "responseSLAHours": 13
      }
    }
  ]
}
```


# document

## POST create document

POST /document

> Body Parameters

```json
{
  "title":"document 1",
  "content":"lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  "tags":["tag 1"],
  "projectId":11
}
```
> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "upload document",
  "data": {
    "title": "document 1",
    "content": "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    "tags": [
      "tag 1"
    ],
    "projectId": 11,
    "_id": "68c18fb232ab4a5166ca51e9",
    "__v": 0
  }
}
```


## GET get documents

GET /document

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|tag|query|string| no |none|
|projectId|query|string| no |none|
|text|query|string| no |none|

> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "Get documents",
  "data": [
    {
      "_id": "68c18fb232ab4a5166ca51e9",
      "title": "document 1",
      "content": "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      "tags": [
        "tag 1"
      ],
      "projectId": 11,
      "__v": 0
    }
  ]
}
```


# analytics

## GET get top vendors

GET /analytics/top-vendors

> Response Examples

> 200 Response

```json
{
  "status": 200,
  "message": "Top Vendors",
  "data": [
    {
      "country": "USA",
      "topVendors": [
        {
          "id": 4,
          "name": "Vendor 4",
          "avgMatchScore": 26
        }
      ],
      "documentsCount": 0
    },
    {
      "country": "Brazil",
      "topVendors": [
        {
          "id": 8,
          "name": "Vendor 8",
          "avgMatchScore": 27
        }
      ],
      "documentsCount": 0
    },
    {
      "country": "Canada",
      "topVendors": [
        {
          "id": 2,
          "name": "Vendor 2",
          "avgMatchScore": 15
        }
      ],
      "documentsCount": 0
    },
    {
      "country": "Japan",
      "topVendors": [
        {
          "id": 4,
          "name": "Vendor 4",
          "avgMatchScore": 26
        },
        {
          "id": 2,
          "name": "Vendor 2",
          "avgMatchScore": 15
        },
        {
          "id": 10,
          "name": "Vendor 10",
          "avgMatchScore": 2.6666666666666665
        }
      ],
      "documentsCount": 1
    },
    {
      "country": "Germany",
      "topVendors": [
        {
          "id": 4,
          "name": "Vendor 4",
          "avgMatchScore": 26
        }
      ],
      "documentsCount": 0
    },
    {
      "country": "India",
      "topVendors": [
        {
          "id": 8,
          "name": "Vendor 8",
          "avgMatchScore": 27
        },
        {
          "id": 6,
          "name": "Vendor 6",
          "avgMatchScore": 22
        },
        {
          "id": 10,
          "name": "Vendor 10",
          "avgMatchScore": 2.6666666666666665
        }
      ],
      "documentsCount": 0
    }
  ]
}
```



## 🤖 Matching Formula

The matching formula is a core part of the application logic. When the `/match/:projectId` endpoint is called, the system performs the following steps:

1. Retrieves the project's **needs** from the MySQL database.

2. Iterates through all available **vendors**.

3. Compares the project's needs against each vendor's `services` and `rating` to calculate a **match score**.

4. Stores the vendor and their calculated score in the `Match` table.

5. Finally sends emails to vendors and project owner

This allows for a dynamic and customizable matching process based on the needs of each project.

## 🌐 Deployment

You can access the live version of this API at:
**https://exppanders360-ya5s7.ondigitalocean.app/expanders3602 **
