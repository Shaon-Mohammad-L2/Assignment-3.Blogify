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
