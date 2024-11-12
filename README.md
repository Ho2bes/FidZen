# FidZen

![FidZen Logo](https://github.com/Ho2bes/FidZen/blob/develop/image/LOGO%20FIDZEN.png)

**FidZen** is a mobile application aimed at simplifying loyalty card management and providing timely notifications for product recalls. With FidZen, users can store all their loyalty cards in one place, receive real-time product recall alerts, and access key information conveniently.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Contributors](#contributors)
- [License](#license)
- [Contact](#contact)

## About

FidZen is designed for modern consumers managing numerous loyalty cards and wanting to stay informed about product recalls that may impact their purchases. By centralizing loyalty cards and notifications, FidZen provides a seamless way to keep track of essential information and ensures users never miss important updates on recalled items.

## Features

- **Loyalty Card Management**: Easily add, view, edit, and delete your loyalty cards.
- **Product Recall Notifications**: Get instant notifications if a purchased product is recalled.
- **Modern Interface**: A clean and user-friendly design for an intuitive experience.
- **Secure Account**: Safe storage of your personal and purchase data.

## Technologies Used

- **Frontend**: React Native
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Notifications**: Push notifications via integrated services (initially explored FCM and OneSignal)
- **Containerization**: Docker (for consistency across development environments)

## Installation

### Prerequisites

- Node.js and npm
- Docker
- PostgreSQL
- React Native CLI (for mobile development)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ho2bes/FidZen.git
   cd FidZen
   ```

2. **Install backend dependencies:**
   ```bash
   	cd backend
	npm install
   ```

3. **Install frontend dependencies**
   ```cd ../FidZen_front
   npm install
	```

4. **Set up Docker environment:**
   ```docker-compose up -d
	```

5. **Database migrations:**
   ```cd backend
   npx prisma migrate dev
   ```

### Start the application:

- **Backend**:
    ```bash
    npm start  # from the backend folder
    ```
- **Frontend**:
    ```bash
    npx react-native run-android  # for Android emulator or device
    ```

## Usage

Create an Account: Register with your email address and a secure password.
Add a Loyalty Card: Add a card through the user interface by filling in the required information.
Enable Notifications: Stay updated on any product recalls.

## Architecture

FidZen’s architecture separates the frontend, backend, and database components to ensure scalability and maintainability.
Frontend (React Native): Handles user interface and interactions.
Backend (Node.js): Manages business logic, REST APIs, and authentication.
Database (PostgreSQL): Stores user data, loyalty card details, and other relevant information.

![Architecture FidZen](https://github.com/Ho2bes/FidZen/blob/develop/image/Architecture%20FidZen.png)

## Contributors

- **Nicolas Brault Domingo** - Web and Mobile Application Developer
- **Erwan Lebreton** - Web and Mobile Application Developer

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or suggestions, please contact the development team at:
[Nicolas Brault Domingo](https://www.linkedin.com/in/nicolas-b-d/) //
[Erwan Lebreton](https://www.linkedin.com/in/erwan-lebreton-336aa8203/)
