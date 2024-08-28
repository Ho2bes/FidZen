# FidZen

![FidZen Logo](https://github.com/Ho2bes/FidZen/blob/develop/image/LOGO%20FIDZEN.png)

**FidZen** is a mobile application designed to centralize your loyalty cards and notify you of product recalls related to your purchases. Simplify the management of your loyalty cards, stay informed of product recalls in real-time, and keep all your essential information at your fingertips.

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

FidZen is designed for modern consumers who juggle numerous loyalty cards. Our application allows you to centralize all your cards in one place, scan your receipts, and receive notifications in case of a product recall. FidZen ensures you never forget a loyalty card and protects you from recalled products.

## Features

- **Loyalty Card Management**: Easily add, edit, and delete your loyalty cards.
- **Receipt Scanning**: Scan your receipts and automatically link them to your loyalty cards.
- **Product Recall Notifications**: Receive real-time alerts if a purchased product is recalled.
- **Intuitive Interface**: A simple and pleasant interface designed for optimal user experience.

## Technologies Used

- **Frontend**: Flutter
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Containerization**: Docker

## Installation

### Prerequisites

- Node.js and npm
- Flutter
- Docker
- PostgreSQL

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/fidzen.git
   cd fidzen
   ```

2. **Install backend dependencies:**
   ```bash
   	cd backend
	npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   	cd ../frontend
	flutter pub get
	```

4. **Set up Docker environment:**
   ```bash
   docker-compose up -d
   ```

5. **Database migrations:**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

### Start the application:

- **Backend**:
    ```bash
    npm run start  # from the backend folder
    ```
- **Frontend**:
    ```bash
    flutter run  # from the frontend folder
    ```

## Usage

- **Create an Account**: Register with your email address and a secure password.
- **Add a Loyalty Card**: Add a card through the user interface by filling in the required information.
- **Scan a Receipt**: Use the scan feature to automatically add purchased products.
- **Receive Notifications**: Enable notifications to be alerted in case of a product recall.

## Architecture

FidZen’s architecture follows a layered approach, separating the frontend, backend, and database for optimal management and security.

- **Frontend (Flutter)**: Manages the user interface and user interactions.
- **Backend (Node.js)**: Manages business logic, REST APIs, and user authentication.
- **Database (PostgreSQL)**: Stores user information, loyalty cards, and receipts.
- **Notifications (FCM)**: Sends product recall notifications to users.

![Architecture FidZen](https://github.com/Ho2bes/FidZen/blob/develop/image/Architecture%20Fi)

## Contributors

- **Nicolas Brault Domingo** - Web and Mobile Application Developer
- **Erwan Lebreton** - Web and Mobile Application Developer

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or suggestions, please contact the development team at:
[Nicolas Brault Domingo](https://www.linkedin.com/in/nicolas-b-d/) //
[Erwan Lebreton](https://www.linkedin.com/in/erwan-lebreton-336aa8203/)
