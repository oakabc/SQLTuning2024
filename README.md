# CRUD API Documentation

This is a simple CRUD (Create, Read, Update, Delete) API built with Node.js and Express. The API uses an in-memory data structure to store items and demonstrates basic RESTful principles.

---

## Base URL

http://localhost:3000


---

## Endpoints

### 1. Create an Item
**HTTP Method**: `POST`  
**Endpoint**: `/items`

**Description**: Adds a new item to the list.

#### Request Body
```json
{
  "name": "string"
}

#### Response
