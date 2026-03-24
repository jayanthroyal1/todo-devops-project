| Layer       | Responsibility          |
| ----------- | ----------------------- |
| Routes      | Define endpoints        |
| Controllers | Handle request/response |
| Services    | Business logic          |
| Models      | DB schema               |
| Middleware  | Auth, roles             |
| Config      | DB/Redis                |
| Utils       | Helpers                 |


GET /api/todos?page=1&limit=10&search=docker&status=completed
| Feature    | Example             |
| ---------- | ------------------- |
| Pagination | `?page=1&limit=10`  |
| Search     | `?search=docker`    |
| Filter     | `?status=completed` |
| Sort       | `?sort=createdAt`   |


Redis Caching

Instead of hitting Database eveytime
Request -> DB SLOW ❌
Request → Redis (fast) → if miss → DB → store in Redis


# Helmet
🧠 What it protects:
XSS attacks
Clickjacking
MIME sniffing
Security headers

HTTP Request logs - Morgan