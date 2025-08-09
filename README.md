# 🐾 Happy Pet Frontend

**Team Project | Full-Stack Web Application | React, Spring Boot, MySQL, AWS, CI/CD**

---

## 📌 Project Overview
**Happy Pet** is a full-stack web platform designed to promote **ethical pet adoption, purchasing, and matchmaking** while fostering **animal welfare awareness**.  
The system connects **adopters, breeders, and shelters** through a secure, **role-based access** platform with a responsive UI and seamless user experience.

This is the **frontend** repository of the Happy Pet project, built with **React** and styled using **Tailwind CSS**, communicating with a Spring Boot backend via REST APIs.

---

## ✨ Features
- 🔐 **User Authentication** – Secure registration & login with JWT-based authentication.
- 📄 **Article Management** – Admins can create, edit, and delete informational content.
- 🐕 **Pet Inquiry Submission** – Users can browse pets and send adoption requests.
- 📱 **Responsive UI** – Mobile-first design with Tailwind CSS.
- 🔔 **Snackbar Notifications** – Real-time feedback for user actions.

---

## 🛠️ Technologies Used
**Frontend**
- React (Next.js)
- TypeScript
- Tailwind CSS
- Material UI (MUI)
- Axios

**Backend**
- Spring Boot (Java)
- JWT Authentication
- AWS EC2 Hosting

**Database**
- MySQL

**DevOps**
- CI/CD Pipelines
- Automated Deployment (Vercel + AWS)

---

## 🚀 Getting Started

### ✅ Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** or **yarn**

### 📦 Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/happypet-frontend.git
   cd happypet-frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
    # or
    yarn install
   ```
4. **Start the development server**
   ```bash
   npm run dev
    # or
    yarn dev
   ```
6. **Open in browser**
- Navigate to http://localhost:3000
---

## Frontend-Backend-DB Flow

<img width="3840" height="2059" alt="Mermaid Chart - Create complex, visual diagrams with text  A smarter way of creating diagrams -2025-08-09-183513" src="https://github.com/user-attachments/assets/d00e0074-56f3-44af-bbaf-ac13dab558da" />

---

## 🔄 Authentication Flow
<img width="3278" height="3840" alt="Mermaid Chart - Create complex, visual diagrams with text  A smarter way of creating diagrams -2025-08-09-182321" src="https://github.com/user-attachments/assets/dd318ec3-f651-4b9e-af0a-ddab7be806fd" />

---


## 🔑 Authentication Endpoints
| Method | Endpoint                   | Description                                |
| ------ | -------------------------- | ------------------------------------------ |
| POST   | `/api/auth/register`       | Register a new user                        |
| POST   | `/api/auth/authenticate`   | Authenticate a user & return JWT           |
| POST   | `/api/auth/register-admin` | Register a new admin (requires secret key) |

## 👥 Matchmaking Management
| Method | Endpoint                      | Access | Description          |
| ------ | ----------------------------- | ------ | -------------------- |
| POST   | `/api/v1/adduser`             | ADMIN  | Add new user         |
| GET    | `/api/v1/getusers`            | ADMIN  | Retrieve all users   |
| PUT    | `/api/v1/updateuser/{id}`     | ADMIN  | Update existing user |
| DELETE | `/api/v1/deleteuser/{userId}` | ADMIN  | Delete user          |

## 🐾 Pet Buy Management
| Method | Endpoint                   | Access | Description        |
| ------ | -------------------------- | ------ | ------------------ |
| GET    | `/api/v1/pets`             | Public | Retrieve all pets  |
| GET    | `/api/v1/pets/{id}`        | Public | Retrieve pet by ID |
| POST   | `/api/v1/pets/add`         | ADMIN  | Add new pet        |
| PUT    | `/api/v1/pets/update/{id}` | ADMIN  | Update pet         |
| DELETE | `/api/v1/pets/delete/{id}` | ADMIN  | Delete pet         |

## 🏡 Adoption Management
| Method | Endpoint                        | Access | Description             |
| ------ | ------------------------------- | ------ | ----------------------- |
| GET    | `/api/v1/adoptions`             | Public | Retrieve all adoptions  |
| GET    | `/api/v1/adoptions/{id}`        | Public | Retrieve adoption by ID |
| POST   | `/api/v1/adoptions/submit`      | Public | Submit adoption request |
| PUT    | `/api/v1/adoptions/update/{id}` | ADMIN  | Update adoption status  |
| DELETE | `/api/v1/adoptions/delete/{id}` | ADMIN  | Delete adoption         |

## 📩 Contact Inquiry Management
| Method | Endpoint               | Access | Description                |
| ------ | ---------------------- | ------ | -------------------------- |
| POST   | `/api/v1/contact`      | Public | Submit contact form        |
| GET    | `/api/v1/contact`      | ADMIN  | Retrieve all contact forms |
| DELETE | `/api/v1/contact/{id}` | ADMIN  | Delete contact form        |
| PUT    | `/api/v1/contact/{id}` | ADMIN  | Update contact form status |

## 🐕 Pet Inquiry Management
| Method | Endpoint                     | Access | Description                |
| ------ | ---------------------------- | ------ | -------------------------- |
| GET    | `/api/v1/pet-inquiries`      | ADMIN  | Retrieve all pet inquiries |
| GET    | `/api/v1/pet-inquiries/{id}` | ADMIN  | Retrieve inquiry by ID     |
| POST   | `/api/v1/pet-inquiries`      | Public | Create new pet inquiry     |
| PUT    | `/api/v1/pet-inquiries/{id}` | ADMIN  | Update inquiry status      |

## 🖼 Image Management
| Method | Endpoint                    | Access | Description        |
| ------ | --------------------------- | ------ | ------------------ |
| GET    | `/api/v1/images/{filename}` | Public | Retrieve pet image |

## 📊 Dashboard
| Method | Endpoint                      | Access | Description                        |
| ------ | ----------------------------- | ------ | ---------------------------------- |
| GET    | `/api/v1/dashboard/formatted` | ADMIN  | Get formatted admin dashboard data |
| GET    | `/api/v1/dashboard/raw`       | ADMIN  | Get raw admin dashboard data       |

---
## 🌍 Impact
- Addressed the lack of ethical pet adoption platforms in Sri Lanka.

- Reduced user friction with intelligent matchmaking and verified breeder/shelter vetting.

- Supported stray animal welfare through community donations and engagement tools.

---
## 🤝 Team Collaboration
- Agile Workflow with 5 team members.

- Modular design, Git version control, and code reviews.

- Regular stand-ups, sprint planning, and retrospectives.

---
## 🎯 Deployment
- Frontend: Vercel → https://happy-pet-seven.vercel.app/
- Backend: AWS EC2 (Spring Boot + MySQL)
---
