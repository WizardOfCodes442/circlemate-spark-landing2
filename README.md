# Authentication API Documentation

A secure authentication API with JWT tokens and session management.

## 🚀 Quick Start

### Base URL
```
Development: http://localhost:3000
Production: https://your-domain.com
```

### Required Headers
```javascript
// For all requests
'Content-Type': 'application/json'

// For protected routes (choose one)
'Authorization': 'Bearer YOUR_JWT_TOKEN'
// OR
'Cookie': 'sessionToken=YOUR_SESSION_TOKEN'
```

## 🔐 Authentication Flow

### 1. Sign Up
```javascript
POST /api/auth/signup

Body:
{
  "userName": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "status": "PENDING",
  "message": "Verification email sent!",
  "user": { ... }
}
```
⚠️ **User must verify email before login**

### 2. Verify Email
Check your email and click the verification link, or manually visit:
```
GET /api/auth/verify/:userId/:uniqueString
```

### 3. Login
```javascript
POST /api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "rememberMe": false  // optional
}

Response:
{
  "status": "success",
  "token": "eyJhbGc...",  // JWT token
  "sessionToken": "abc123...",
  "user": { ... }
}
```
💡 **Save the token - you'll need it for protected routes!**

### 4. Access Protected Routes
```javascript
// Example: Get user profile
GET /api/auth/me

Headers:
{
  "Authorization": "Bearer eyJhbGc..."
}

Response:
{
  "status": "success",
  "user": { ... }
}
```

## 📚 API Endpoints

### Public Endpoints (No Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new account |
| POST | `/api/auth/login` | Login to account |
| GET | `/api/auth/verify/:userId/:uniqueString` | Verify email |
| POST | `/api/auth/forgotpassword` | Request password reset |
| POST | `/api/auth/reset-password/:token` | Reset password |
| POST | `/api/auth/resend-verification` | Resend verification email |

### Protected Endpoints (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout current session |
| POST | `/api/auth/logout-all` | Logout all devices |
| GET | `/api/auth/sessions` | Get active sessions |
| POST | `/api/auth/refresh` | Refresh access token |

## 💻 Frontend Integration Examples

### React/Axios Example
```javascript
import axios from 'axios';

// Configure axios defaults
const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true  // Important for cookies
});

// Add token to requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login function
const login = async (email, password) => {
  try {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return data.user;
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
};

// Get user profile
const getProfile = async () => {
  try {
    const { data } = await API.get('/auth/me');
    return data.user;
  } catch (error) {
    console.error('Not authenticated');
  }
};
```

### Fetch API Example
```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',  // Important for cookies
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    return data;
  }
  throw new Error(data.message);
};

Note** on Login you get data as - 
{
    "status": "success",
    "message": "Logged in successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODM0ZTdjYzFkNjAxZjU5MTRlYjhmYWEiLCJpYXQiOjE3NDgyOTk0MDYsImV4cCI6MTc0ODM4NTgwNn0.Qwgdb46HAQOj_hsbOIincjOKZBFs8GcbR0ly94utRRM",
    "sessionToken": "e11b8616c3a04f1ddb91c377c3437dafe65bbbb423b02e607899fb6907b2827e",
    "user": {
        "_id": "6834e7cc1d601f5914eb8faa",
        "userName": "testuser",
        "firstName": "Test",
        "lastName": "User",
        "email": "rhymeanabel@gmail.com",
        "role": "user",
        "verified": true
    }
}
// Protected request
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Unauthorized');
  }
  return response.json();
};
```

## 🛡️ Security Features

- **Password Requirements**: Min 8 chars, must include letters & numbers
- **Account Locking**: Locked for 30 min after 5 failed login attempts
- **Rate Limiting**: Max 20 auth requests per 15 minutes per IP
- **Session Management**: Sessions expire after 24 hours (30 days with "Remember Me")
- **Email Verification**: Required before first login

## ⚠️ Error Responses

```javascript
{
  "status": "FAILED",
  "message": "Error description",
  "errors": [...]  // Validation errors (if applicable)
}
```

### Common Error Codes
- `400` - Bad Request (validation failed)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `423` - Locked (too many failed attempts)
- `429` - Too Many Requests (rate limited)

## 🔄 Token Refresh

When your JWT expires, use the refresh endpoint:
```javascript
POST /api/auth/refresh

// Cookies must include refreshToken
Response:
{
  "status": "success",
  "token": "new.jwt.token"
}
```

## 📱 Best Practices

1. **Store tokens securely**
   - Web: HttpOnly cookies or localStorage (be aware of XSS risks)
   - Mobile: Secure storage (Keychain/Keystore)

2. **Handle token expiration**
   ```javascript
   // Axios interceptor example
   API.interceptors.response.use(
     response => response,
     async error => {
       if (error.response?.status === 401) {
         // Try to refresh token
         await refreshToken();
         // Retry original request
         return API(error.config);
       }
       return Promise.reject(error);
     }
   );
   ```

3. **Logout properly**
   ```javascript
   const logout = async () => {
     await API.post('/auth/logout');
     localStorage.removeItem('token');
     window.location.href = '/login';
   };
   ```

## 🚨 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Email not verified" | Check email for verification link |
| "Invalid credentials" | Check email/password (generic for security) |
| "Account locked" | Wait 30 minutes or contact admin |
| "Token expired" | Use refresh token or login again |
| "Too many requests" | Wait 15 minutes (rate limited) |

## 📧 Need Help?

- Check response `message` for specific errors
- Ensure you're sending the token in headers
- Verify CORS is configured for your frontend URL
- Check network tab for cookie/header issues

---


# Onboarding API Documentation

## Prerequisites
- User must be authenticated (logged in)
- Include JWT token in all requests

## Base URL
```
Development: http://localhost:3000/api/onboarding
Production: https://your-domain.com/api/onboarding
```

## Headers Required
```javascript
{
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

---

## 🚀 API Endpoints

### Get Onboarding Status
```http
GET /status
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "onboardingStep": 2,
    "onboardingCompleted": false,
    "profileCompleteness": 35,
    "profile": { ... }
  }
}
```

---

### 1️⃣ Community Selection

#### Get Available Communities
```http
GET /communities?search=tech
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "communities": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "name": "Tech Enthusiasts",
        "description": "Connect with fellow developers...",
        "memberCount": 5243
      }
    ]
  }
}
```

#### Join Community
```http
POST /community
```
**Option 1 - By ID:**
```json
{
  "communityId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```
**Option 2 - By Invite Code:**
```json
{
  "inviteCode": "TECH2024"
}
```

---

### 2️⃣ Profile Information
```http
POST /profile
```
**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 25,
  "gender": "male",
  "bio": "Software developer passionate about AI",
  "occupation": "Software Engineer"
}
```
**Gender options:** `male`, `female`, `other`, `prefer-not-to-say`

---

### 3️⃣ Location
```http
POST /location
```
**Body:**
```json
{
  "city": "San Francisco",
  "state": "California",
  "country": "United States",
  "postalCode": "94105",
  "latitude": 37.7749,    // Optional
  "longitude": -122.4194   // Optional
}
```

---

### 4️⃣ Personality Traits
```http
POST /personality
```
**Body:**
```json
{
  "personalityTraits": ["creative", "analytical", "outgoing"]
}
```
**Available traits:** 
- `adventurous`, `analytical`, `creative`, `empathetic`
- `organized`, `outgoing`, `relaxed`, `ambitious`
- `thoughtful`, `practical`, `curious`, `reliable`

**Rules:** Min 1, Max 5 traits

---

### 5️⃣ Preferences
```http
POST /preferences
```
**Body:**
```json
{
  "connectionPurposes": ["friendship", "networking"],
  "interests": ["Hiking", "Photography", "Cooking", "AI", "Travel"]
}
```
**Purpose options:** `friendship`, `dating`, `networking`, `activities`

---

### 6️⃣ Availability
```http
POST /availability
```
**Body:**
```json
{
  "days": ["Saturday", "Sunday"],
  "timePreferences": ["afternoon", "evening"]
}
```
**Day options:** `Monday` through `Sunday`  
**Time options:** `morning`, `afternoon`, `evening`, `night`

---

### 7️⃣ Profile Photos
```http
POST /photos
```
**Headers:**
```javascript
{
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'multipart/form-data'
}
```
**Body:** FormData with field name `photos`
- Max 8 photos
- Max 5MB each
- Accepted: JPG, PNG, GIF

**JavaScript Example:**
```javascript
const formData = new FormData();
files.forEach(file => formData.append('photos', file));

await fetch('/api/onboarding/photos', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

#### Delete Photo
```http
DELETE /photos/:photoId
```

---

### ✅ Complete Onboarding
```http
POST /complete
```
**Note:** Call this after all steps are done (minimum step 6)

---

## 📝 Error Responses

```json
{
  "status": "FAILED",
  "message": "Error description",
  "errors": [
    {
      "field": "age",
      "message": "Age must be between 18 and 120"
    }
  ]
}
```

**Common Errors:**
- `400` - Validation failed
- `401` - Not authenticated
- `404` - Resource not found

---

## 💡 Frontend Integration Example

```typescript
// Step-by-step flow
try {
  // 1. Join community
  await api.post('/onboarding/community', { communityId: selectedId });
  
  // 2. Update profile
  await api.post('/onboarding/profile', {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    gender: "male",
    bio: "Developer",
    occupation: "Software Engineer"
  });
  
  // 3. Set location
  await api.post('/onboarding/location', {
    city: "San Francisco",
    state: "California",
    country: "United States",
    postalCode: "94105"
  });
  
  // Continue with remaining steps...
  
} catch (error) {
  console.error(error.response.data.message);
}
```

---

## 🔄 Check Progress

Always check onboarding status to resume from the correct step:

```javascript
const { data } = await api.get('/onboarding/status');
const currentStep = data.data.onboardingStep;

// Navigate to appropriate step
switch(currentStep) {
  case 0: navigate('/onboarding/community'); break;
  case 1: navigate('/onboarding/profile'); break;
  case 2: navigate('/onboarding/location'); break;
  // ... etc
}
```

---

## 📌 Quick Reference

| Step | Endpoint | Required Fields |
|------|----------|----------------|
| 1 | POST /community | `communityId` OR `inviteCode` |
| 2 | POST /profile | `firstName`, `lastName`, `age`, `gender` |
| 3 | POST /location | `city`, `state`, `country`, `postalCode` |
| 4 | POST /personality | `personalityTraits[]` (1-5 items) |
| 5 | POST /preferences | `connectionPurposes[]`, `interests[]` |
| 6 | POST /availability | `days[]`, `timePreferences[]` |
| 7 | POST /photos | `photos` (FormData, max 8 files) |
| - | POST /complete | No body required |

---

**Questions?** Check the error message - it usually tells you exactly what's wrong.
