# Blogify

## Overview

Blogify is a backend solution for a blogging platform where users can write, update, and delete blogs. The system distinguishes between **Admin** and **User** roles, with role-specific permissions. The backend includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Features

### User Roles

### Admin:
- Can delete any blog.
- Can unpublish or make any blog private.
- Can block any user by updating their `isBlocked` property.
- Can delete any user by setting their `isDeleted` property.  
  **Note:** When a user is deleted, all their published posts will automatically be unpublished using the `isPublished` property.
- Can fetch all users with query options such as:
  - **Search:**   Search users by name or email (e.g., search=jhon).
  - **Sort:** Sort by any field using `sortBy` (e.g., name or email) and `sortOrder=` (asc = ascending or desc = descending).
  - **Filter:** Filter by specific criteria (e.g., email).
- Can fetch details of a single user.
- **Limitation:** Cannot update blogs.

### User:
- Can register and log in.
- Can create, update, and delete their own blogs.
- Cannot perform any admin-specific actions.


## Authentication & Authorization

### Authentication:
- Users are required to log in to perform actions such as writing, updating, or deleting blogs.

### Authorization:
- Role-based access control ensures that resources and actions are appropriately secured for **Admins** and **Users**.

## API Endpoints

### Authentication

#### Register User
- **Method:** POST
- **Endpoint:** `/api/auth/register`
- **Description:** Register a new user.
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login User
- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Description:** Authenticate a user and return a JWT.
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Refresh Token
- **Method:** POST
- **Endpoint:** `/api/auth/refresh-token`
- **Description:** Generate a new access token using a refresh token.


### Blog Management

#### Create Blog
- **Method:** POST
- **Endpoint:** `/api/blogs`
- **Description:** Create a new blog (requires authentication).
- **Request Header:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

#### Update Blog
- **Method:** PATCH
- **Endpoint:** `/api/blogs/:id`
- **Description:** Update a user’s blog by its ID.
- **Request Header:** `Authorization: Bearer <token>`

#### Delete Blog
- **Method:** DELETE
- **Endpoint:** `/api/blogs/:id`
- **Description:** Delete a user’s blog by its ID.
- **Request Header:** `Authorization: Bearer <token>`

#### Get All Blogs
- **Method:** GET
- **Endpoint:** `/api/blogs`
- **Description:** Public API to fetch all blogs with search, sort, and filter options.
- **Query Parameters:**
  - `search`: Filter blogs by title or content.
  - `sortBy`: Sort blogs by `createdAt`, `title`, etc.
  - `sortOrder`: `asc` (ascending) or `desc` (descending).
  - `filter`: Filter blogs by author ID.
#### Example Request URL:
```json
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```


### Admin Actions

#### Block User
- **Method:** PATCH
- **Endpoint:** `/api/admin/users/:userId/block`
- **Description:** Block a user (Admin-only action).
- **Request Header:** `Authorization: Bearer <admin_token>`

#### Delete User
- **Method:** PATCH
- **Endpoint:** `/api/admin/users/:userId/delete`
- **Description:** Delete a user (Admin-only action).
- **Request Header:** `Authorization: Bearer <admin_token>`

#### Get Single Blog
- **Method:** GET
- **Endpoint:** `/api/admin/blogs/:id`
- **Description:** Fetch a single blog's details by its ID.

#### Unpublish Blog
- **Method:** PATCH
- **Endpoint:** `/api/admin/blogs/:id/private`
- **Description:** Unpublish a blog (Admin-only action).

#### Delete Blog
- **Method:** DELETE
- **Endpoint:** `/api/admin/blogs/:id`
- **Description:** Delete any blog by its ID (Admin-only action).

## Error Handling

### Types of Errors Handled:
- **Zod Validation Error**: Handles input validation errors using Zod.
- **Not Found Error**: Handles cases where a resource (e.g., blog or user) is not found.
- **Mongoose Validation Error**: Handles validation errors related to Mongoose models.
- **Mongoose Cast Error**: Handles invalid type casting errors when querying MongoDB.
- **Mongoose Duplicate Error**: Handles errors when a duplicate value is inserted (e.g., duplicate email).
- **Custom AppError Handle**: Handles custom application-specific errors with appropriate messages.
- **Built-in Error Handle**: Handles standard error responses from the framework or libraries.
- **Authentication Error**: Handles errors related to failed authentication, such as invalid or expired tokens.
- **Authorization Error**: Handles errors related to insufficient permissions for specific actions.
- **Internal Server Error**: Catches unhandled errors within the application (e.g., database issues).
- **Unhandled Promise Rejection**: Catches unhandled promise rejections in asynchronous operations.
- **Uncaught Exception**: Handles uncaught exceptions that could crash the application.
- **Global Error Handle**: A global error handler that catches all the above errors and sends appropriate responses to the client.


## Technologies Used

- **Language:** TypeScript
- **Frameworks:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Validation:** Zod

