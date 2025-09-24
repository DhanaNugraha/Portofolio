## TiketQ Backend Microservices Monorepo

This repository contains the backend microservices for TiketQ, an OTA (Online Travel Agent) platform providing flight, ferry, hotel bookings, PPOB services, payments, and API gateway functionalities.

### Overall Structure
```bash
/tiketq-backend/
│
├── docker-compose.yml
├── .env
├── README.md
├── RBAC_DOCUMENTATION.md      # RBAC implementation guide
├── API_SPECIFICATIONS.md       # Detailed API specifications
│
├── nginx/
│   └── nginx.conf
│
├── shared/
│   ├── logger.py                 # Logger adapter for all services
│   ├── config.py                 # Env loader & shared helpers
│   └── requirements.txt
│
├── api-gateway/
│   ├── app.py                   # Entry point (Adapter: inbound)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── utils/
│       └── forwarder.py         # Adapter: forwarding requests to services
│
├── auth-service/
│   ├── app.py                   # Adapter: inbound API
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── test_rbac.py             # RBAC test script
│   ├── openapi.json             # OpenAPI specification
│   ├── domain/
│   │    ├── models.py           # Core domain models (User, Token, Role, etc)
│   │    ├── services.py         # Business logic (ports) with RBAC
│   │    └── repository.py       # Repository interfaces (DB port)
│   ├── adapters/
│   │    ├── db.py               # DB implementation (adapter) with role support
│   │    └── api.py              # External API clients if any
│   └── routes/
│        └── auth_routes.py      # REST API adapter (inbound) with RBAC middleware
│
├── user-service/
│   ├── app.py                   # User profile management service
│   ├── Dockerfile               # Container configuration
│   ├── requirements.txt
│   ├── test_user_service.py     # User service test script
│   ├── openapi.json             # OpenAPI specification
│   ├── README.md                # User service documentation
│   ├── domain/
│   │    ├── models.py           # User profile models with role support
│   │    ├── services.py         # Business logic (ports)
│   │    └── repository.py       # User DB interface
│   ├── adapters/
│   │    ├── db.py               # DB adapter for user data with role support
│   │    └── api.py              # External API clients if any
│   └── routes/
│        └── user_routes.py      # REST API adapter (inbound) with RBAC
│
├── transaction-service/
│   ├── app.py                   # Transaction management service
│   ├── Dockerfile               # Container configuration
│   ├── requirements.txt
│   ├── README.md                # Transaction service documentation
│   ├── domain/
│   │    ├── models.py           # Transaction, Order, Payment models
│   │    ├── services.py         # Business logic (ports)
│   │    └── repository.py       # Transaction DB interface
│   ├── adapters/
│   │    ├── db.py               # DB adapter for transaction data
│   │    ├── payment_gateway.py  # Payment gateway integration
│   │    └── webhook_handler.py  # Webhook handlers
│   └── routes/
│        ├── transaction_routes.py # Transaction management API
│        ├── order_routes.py      # Order processing API
│        └── payment_routes.py    # Payment processing API
│
├── flights-service/
│   ├── app.py
│   ├── Dockerfile               # Container configuration
│   ├── requirements.txt
│   ├── domain/
│   │    ├── models.py           # Flight domain models
│   │    ├── services.py         # Business logic (ports)
│   │    └── repository.py       # Maybe for caching or user prefs if needed
│   ├── adapters/
│   │    └── external_api.py     # All external flight provider clients here (adapters)
│   └── routes/
│        └── flights.py          # Inbound API
│
├── ferries-service/
│   ├── app.py
│   ├── Dockerfile               # Container configuration
│   ├── requirements.txt
│   ├── domain/
│   │    ├── models.py           # Ferry domain models
│   │    ├── services.py         # Business logic (ports)
│   │    └── repository.py       # Repository interfaces
│   ├── adapters/
│   │    └── external_api.py     # External ferry provider clients
│   └── routes/
│        └── ferries.py          # Inbound API
│
├── hotels-service/
│   ├── app.py
│   ├── Dockerfile               # Container configuration
│   ├── requirements.txt
│   ├── domain/
│   │    ├── models.py           # Hotel domain models
│   │    ├── services.py         # Business logic (ports)
│   │    └── repository.py       # Repository interfaces
│   ├── adapters/
│   │    └── external_api.py     # External hotel provider clients
│   └── routes/
│        └── hotels.py           # Inbound API
│
├── ppob-service/
│   ├── app.py
│   ├── Dockerfile               # Container configuration
│   ├── requirements.txt
│   ├── domain/
│   │    ├── models.py           # PPOB domain models
│   │    ├── services.py         # Business logic (ports)
│   │    └── repository.py       # Repository interfaces
│   ├── adapters/
│   │    └── external_api.py     # External PPOB provider clients
│   └── routes/
│        └── ppob.py             # Inbound API
│
├── payment-service/
│   ├── app.py
│   ├── Dockerfile               # Container configuration
│   ├── requirements.txt
│   ├── domain/
│   │    ├── models.py
│   │    ├── services.py
│   │    └── repository.py       # For DB interface
│   ├── adapters/
│   │    ├── midtrans_adapter.py # Midtrans API adapter
│   │    └── webhook_handler.py  # Webhook adapter
│   └── routes/
│        └── payment.py
│
├── secrets/                     # Create this please, see Docker-compose for reference
│   └── db_user.txt
│
└── postgres/
    └── init.sql                 # DB schema with user, auth, role, and transaction tables

```

----

### Overview
The backend is implemented as a collection of loosely coupled microservices within a monorepo, each responsible for a specific domain:

- `api-gateway`: Routes incoming client requests to appropriate services.
- `auth-service`: Manages user authentication, authorization, and **Role-Based Access Control (RBAC)**.
- `user-service`: Handles user profile management with **RBAC-protected endpoints**.
- `transaction-service`: Manages booking transactions, order processing, and payment confirmations.
- `flights-service`, `ferries-service`, `hotels-service`, `ppob-service`: Integrate with various external APIs to provide booking and information services.
- `payment-service`: Manages payment processing and related webhooks.
- `postgres`: Contains database schema initialization scripts with role support.

### 🔐 Role-Based Access Control (RBAC)

The system implements a comprehensive RBAC system with two roles:

#### **USER Role**
- Can access their own profile information
- Can update their own profile
- Cannot access other users' data
- Cannot perform administrative functions

#### **ADMIN Role**
- Full access to all user data
- Can create, read, update, and delete any user profile
- Can manage user roles
- Can list all users in the system

#### **RBAC Features**
- **JWT Token Enhancement**: Tokens include role information
- **Role-based Authorization**: Different access levels based on user role
- **Ownership Validation**: Users can only access their own data
- **Database Constraints**: Role values are constrained at database level
- **Middleware Protection**: All protected endpoints use RBAC middleware

#### **Protected Endpoints**

| Service | Endpoint | USER | ADMIN | Description |
|---------|----------|------|-------|-------------|
| Auth | `/auth/register` | ✅ | ✅ | Register new user |
| Auth | `/auth/login` | ✅ | ✅ | Login user |
| Auth | `/auth/me` | ✅ | ✅ | Get own info |
| Auth | `/auth/users` | ❌ | ✅ | List all users |
| Auth | `/auth/users/{id}` | ❌ | ✅ | Get specific user |
| Auth | `/auth/users/{id}/role` | ❌ | ✅ | Update user role |
| User | `POST /users/` | ❌ | ✅ | Create profile |
| User | `GET /users/{id}` | ✅* | ✅ | Get profile |
| User | `PUT /users/{id}` | ✅* | ✅ | Update profile |
| User | `DELETE /users/{id}` | ❌ | ✅ | Delete profile |
| User | `GET /users/` | ❌ | ✅ | List all users |
| Transaction | `POST /transactions/` | ✅ | ✅ | Create transaction |
| Transaction | `GET /transactions/{id}` | ✅* | ✅ | Get transaction |
| Transaction | `POST /transactions/{id}/refund` | ❌ | ✅ | Process refund |

*Users can only access their own profiles/transactions

### 📚 API Documentation

All services provide comprehensive API documentation:

#### **Interactive Documentation**
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

#### **Service-Specific Documentation**
- **Auth Service**: Complete authentication and user management APIs
- **User Service**: User profile management with RBAC protection
- **Transaction Service**: Transaction management, order processing, and payment handling
- **OpenAPI Specifications**: Available in each service directory

### Architecture: Ports and Adapters (Hexagonal Architecture)
To ensure maintainability and adaptability, the services are designed following the **Ports and Adapters** architectural pattern, also known as Hexagonal Architecture. This design separates the core business logic from external dependencies, allowing each component to evolve independently.

### Key Concepts
- **Domain Layer** (Core Logic):
  Contains the business rules and domain models. It is agnostic to external systems such as databases, web frameworks, or third-party APIs. This layer defines ports (interfaces) representing required services or repositories.
- **Adapters:**
  Concrete implementations of ports, acting as bridges between the domain and external systems. These include:
  - **Inbound Adapters:** Handle communication from outside systems into the domain (e.g., REST API endpoints).
  - **Outbound Adapters:** Handle communication from the domain out to external systems (e.g., database clients, third-party API wrappers).

- **Benefits:**
  - Isolates business logic from infrastructure concerns.
  - Simplifies testing by allowing mocking of external dependencies.
  - Enables easy replacement or extension of external services without changing domain logic.

### Repository Structure
Each service follows a consistent structure:

```bash
/service-name/
├── app.py                    # Entry point for the service (API server)
├── Dockerfile                # Container configuration
├── requirements.txt          # Python dependencies
├── domain/                   # Business logic and domain models
│   ├── models.py             # Data models representing core entities
│   ├── services.py           # Business use cases and domain services (ports)
│   └── repository.py         # Interfaces defining data access or external service contracts
├── adapters/                 # Implementations of ports (external API clients, database access)
│   ├── db.py                 # Database client or ORM implementations
│   └── external_api.py       # Wrappers around third-party APIs
└── routes/                   # API routes and controllers (inbound adapters)
    └── *.py
```

### Database Usage
- The database (PostgreSQL) stores **user-related data**, **authentication data**, **transaction data**, and **ticketing information**.
- **Role-based access control** is enforced at both application and database levels.
- Only services that require persistent data interact with the database via well-defined repository interfaces and adapters.
- External API data is consumed directly by service adapters without persistence, except where caching or state is explicitly needed.

## Architecture Diagram

```bash
            +------------------+
            |    API Gateway    |  <-- Client requests (REST, etc)
            +------------------+
                     |
         +-----------+------------+
         |                        |
 +---------------+        +----------------+
 | Auth Service  |        |  Other Services |
 | (User tokens) |        | (Flights, Hotels,|
 | (RBAC)        |        |  Ferries, PPOB,  |
 +---------------+        |  Payments, User) |
         |                +-----------------+
         |                         |
         |                         |
         |           +-------------+--------------+
         |           |                            |
 +---------------+  +----------------+        +----------------+
 |   Database    |  | External APIs  |        | External APIs  |
 | (User, Auth,  |  | (Flight APIs,  |        | (Midtrans, PLN,|
 |  Roles)       |  | Hotels, etc)   |        |  other 3rd party|
 +---------------+  +----------------+        +----------------+
```

### Communication Flow
1. The **API Gateway** serves as the entry point, routing client requests to appropriate microservices.
2. It validates requests by communicating with the **Auth Service** using **RBAC-protected tokens**.
3. Microservices process requests by invoking their domain logic with **role-based authorization**.
4. To fulfil requests, services interact with external APIs via outbound adapters or with the database where applicable.
5. Responses are returned back through the API Gateway to the client.

### Getting Started
- Ensure environment variables are correctly set in .env.
- Run docker-compose up to start all services and dependencies.
- Explore each service's /routes directory to understand available API endpoints.
- Review the /domain folders for business logic implementation.
- Adapters in /adapters demonstrate integration with databases and external APIs.

### Testing RBAC
```bash
# Test auth-service RBAC functionality
cd auth-service
python test_rbac.py

# Test user-service functionality
cd user-service
python test_user_service.py
```

### Example commands to run the stack

```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs of a specific service, e.g., auth-service
docker-compose logs -f auth-service

# Run API Gateway locally (if you want to skip Docker)
cd api-gateway
pip install -r requirements.txt
python app.py

# Test RBAC functionality
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "adminpass", "role": "admin"}'

# Access API documentation
# Swagger UI: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

### Documentation
- **RBAC_DOCUMENTATION.md**: Comprehensive guide to the RBAC implementation
- **user-service/README.md**: Detailed documentation for the user service
- **OpenAPI Specifications**: Available in each service directory
- **Interactive API Docs**: Swagger UI and ReDoc for all services
- Each service contains its own documentation and test scripts




What i made:
# Transaction Service

The Transaction Service is responsible for managing booking transactions, order processing, and transaction history in the TiketQ platform. It handles the complete lifecycle of transactions from creation to completion.

## Features

- Create and manage booking transactions
- Process payment confirmations
- Track transaction status and history
- Generate transaction reports
- Handle refunds and cancellations
- Integrate with payment and booking services

## Architecture

The service follows the Hexagonal Architecture pattern:

### Domain Layer
- **Models**: Transaction, Order, Payment, Refund entities
- **Services**: Business logic for transaction processing
- **Repository**: Data access interfaces

### Adapters Layer
- **Database**: PostgreSQL implementation for transaction storage
- **External APIs**: Integration with payment gateways and booking services
- **Event Handlers**: Message queue consumers for async processing

### Routes Layer
- **API Endpoints**: RESTful API for transaction management
- **Webhooks**: Payment gateway webhook handlers
- **Event Publishers**: Message queue publishers for notifications

## API Endpoints

### Transaction Management

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/transactions/` | POST | USER/ADMIN | Create new transaction |
| `/transactions/{id}` | GET | USER/ADMIN | Get transaction details |
| `/transactions/{id}` | PUT | USER/ADMIN | Update transaction |
| `/transactions/{id}/cancel` | POST | USER/ADMIN | Cancel transaction |
| `/transactions/{id}/refund` | POST | ADMIN | Process refund |
| `/transactions/` | GET | USER/ADMIN | List transactions |

### Order Processing

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/orders/` | POST | USER/ADMIN | Create new order |
| `/orders/{id}` | GET | USER/ADMIN | Get order details |
| `/orders/{id}/status` | PUT | ADMIN | Update order status |
| `/orders/` | GET | USER/ADMIN | List orders |

### Payment Processing

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/payments/` | POST | USER/ADMIN | Create payment |
| `/payments/{id}` | GET | USER/ADMIN | Get payment details |
| `/payments/{id}/confirm` | POST | ADMIN | Confirm payment |
| `/payments/{id}/refund` | POST | ADMIN | Process payment refund |
| `/webhooks/payment` | POST | Public | Payment gateway webhook |

### Reports and Analytics

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/reports/transactions` | GET | ADMIN | Transaction reports |
| `/reports/revenue` | GET | ADMIN | Revenue analytics |
| `/reports/refunds` | GET | ADMIN | Refund reports |

## Database Schema

### Transactions Table
```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    status VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50),
    payment_gateway VARCHAR(50),
    gateway_transaction_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    order_number VARCHAR(255) UNIQUE NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    service_id VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    booking_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Payments Table
```sql
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(id),
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    status VARCHAR(50) NOT NULL,
    gateway_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Refunds Table
```sql
CREATE TABLE refunds (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(id),
    amount DECIMAL(10,2) NOT NULL,
    reason VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    processed_by INTEGER,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Transaction Status Flow

### Transaction States
1. **PENDING**: Transaction created, awaiting payment
2. **PROCESSING**: Payment being processed
3. **COMPLETED**: Payment successful, transaction complete
4. **FAILED**: Payment failed
5. **CANCELLED**: Transaction cancelled by user or system
6. **REFUNDED**: Transaction refunded

### Order States
1. **DRAFT**: Order created, not yet confirmed
2. **CONFIRMED**: Order confirmed, awaiting payment
3. **PAID**: Payment received, booking confirmed
4. **CANCELLED**: Order cancelled
5. **COMPLETED**: Service delivered

## Integration Points

### External Services
- **Payment Gateway**: Midtrans, Xendit integration
- **Booking Services**: Flights, Hotels, Ferries, PPOB services
- **User Service**: User authentication and profile data
- **Notification Service**: Email and SMS notifications

### Message Queue Events
- **Transaction Created**: Notify user and update inventory
- **Payment Confirmed**: Update booking status and send confirmation
- **Transaction Failed**: Notify user and release inventory
- **Refund Processed**: Update booking and notify user

## Security Features

### Authentication & Authorization
- JWT token validation for all protected endpoints
- Role-based access control (USER/ADMIN)
- User can only access their own transactions
- Admin can access all transactions

### Data Protection
- Sensitive payment data encrypted
- PCI DSS compliance for payment processing
- Audit logging for all transaction changes
- Secure webhook validation

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TRANSACTION_DB_URL` | Database connection string | Required |
| `JWT_SECRET` | JWT token signing secret | Required |
| `PAYMENT_GATEWAY_URL` | Payment gateway API URL | Required |
| `PAYMENT_GATEWAY_KEY` | Payment gateway API key | Required |
| `REDIS_URL` | Redis connection for caching | Optional |
| `RABBITMQ_URL` | Message queue connection | Optional |

## Monitoring & Logging

### Metrics
- Transaction success/failure rates
- Payment processing times
- Revenue analytics
- Refund rates and reasons

### Logging
- Structured logging for all transactions
- Payment gateway communication logs
- Error tracking and alerting
- Audit trail for compliance

## Testing

### Test Categories
- **Unit Tests**: Business logic and domain services
- **Integration Tests**: Database and external API integration
- **API Tests**: Endpoint functionality and error handling
- **Payment Tests**: Payment gateway integration
- **Security Tests**: Authentication and authorization

### Test Scripts
- `test_transaction_service.py`: API endpoint testing
- `test_payment_integration.py`: Payment gateway testing
- `test_webhooks.py`: Webhook handler testing

## Deployment

### Docker
```bash
# Build image
docker build -t transaction-service .

# Run container
docker run -p 8000:8000 transaction-service
```

### Docker Compose
```yaml
transaction-service:
  build: ./transaction-service
  ports:
    - "8000:8000"
  environment:
    - TRANSACTION_DB_URL=postgresql://user:pass@db:5432/transactions
    - JWT_SECRET=your-secret-key
  depends_on:
    - postgres
    - redis
```

## API Documentation

### Interactive Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

### OpenAPI Specification
- Complete API specification in `openapi.json`
- Request/response examples
- Error code documentation
- Authentication requirements

## Future Enhancements

1. **Multi-currency Support**: Support for multiple currencies
2. **Subscription Billing**: Recurring payment processing
3. **Advanced Analytics**: Real-time transaction analytics
4. **Fraud Detection**: AI-powered fraud detection
5. **Mobile SDK**: Mobile payment integration
6. **International Payments**: Support for international payment methods 

