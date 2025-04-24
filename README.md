# ArtConnect Backend

## Overview
ArtConnect is a scalable backend application designed to facilitate a vibrant community for artists, students, and art enthusiasts. The application provides essential features such as artist profiles, portfolio uploads, event management, community feedback, educational resources, and messaging.

## Features
- **User Authentication & Role Management**: Secure signup/login with JWT-based authentication and role management for different user types.
- **Portfolio & Gallery Management**: Users can upload artworks, view portfolios, and engage with artworks through likes and comments.
- **Event Management**: Create, edit, and manage art events, with options for users to RSVP or express interest.
- **Feedback & Critique**: Users can provide structured feedback on artworks and retrieve feedback by artwork ID.
- **Messaging**: Real-time messaging capabilities for users to communicate and retrieve conversation history.
- **Learning Resources**: Upload and view educational articles and videos categorized by topic.
- **Notification System**: Users receive notifications for likes, comments, messages, and event updates.
- **Admin Panel**: Admins can manage users and report inappropriate content.

## Tech Stack
- **Node.js** with **Express.js** for server-side development.
- **MySQL** as the relational database.
- **Sequelize** ORM for database abstraction (optional).
- **JWT** for secure authentication.
- **Multer** for handling file uploads (artwork images).
- **Socket.io** for optional real-time messaging enhancements.

## Folder Structure
```
ArtConnect-backend
├── controllers         # API route logic
├── routes              # Express route definitions
├── models              # Sequelize DB models
├── middleware          # Auth and error handlers
├── uploads             # Artwork/media storage
├── config              # DB and environment configuration
├── utils               # Helper functions
├── app.js              # Entry point of the application
├── package.json        # NPM configuration
├── README.md           # Project documentation
└── .env                # Environment variables
```

## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ArtConnect-backend.git
   cd ArtConnect-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables in the `.env` file:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:
   ```
   npm start
   ```

## API Documentation
Refer to the individual route files in the `routes` directory for detailed API usage and endpoints.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.