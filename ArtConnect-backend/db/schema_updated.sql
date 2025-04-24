
CREATE TABLE users (
  uuid CHAR(36) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('artist', 'student', 'supporter', 'collector', 'institution', 'admin') NOT NULL,
  bio TEXT,
  profile_image_url VARCHAR(255),
  joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active TIMESTAMP NULL,
  location VARCHAR(255),
  website VARCHAR(255),
  social JSON
);

CREATE TABLE artworks (
  uuid CHAR(36) PRIMARY KEY,
  artist_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  additional_images JSON,
  categories JSON,
  tags JSON,
  medium VARCHAR(255),
  dimensions VARCHAR(255),
  creation_date DATE,
  price DECIMAL(10,2),
  creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (artist_id) REFERENCES users(uuid) ON DELETE CASCADE
);

CREATE TABLE comments (
  uuid CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  artwork_id CHAR(36) NOT NULL,
  comment TEXT,
  creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(uuid),
  FOREIGN KEY (artwork_id) REFERENCES artworks(uuid)
);

CREATE TABLE likes (
  uuid CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  artwork_id CHAR(36) NOT NULL,
  creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(uuid),
  FOREIGN KEY (artwork_id) REFERENCES artworks(uuid)
);

CREATE TABLE events (
  uuid CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  location VARCHAR(255),
  is_virtual BOOLEAN DEFAULT FALSE,
  virtual_link VARCHAR(255),
  organizer_id CHAR(36) NOT NULL,
  start_datetime DATETIME,
  end_datetime DATETIME,
  categories JSON,
  creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organizer_id) REFERENCES users(uuid)
);

CREATE TABLE event_attendees (
  uuid CHAR(36) PRIMARY KEY,
  event_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  status ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered',
  registration_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(uuid),
  FOREIGN KEY (user_id) REFERENCES users(uuid)
);

CREATE TABLE messages (
  uuid CHAR(36) PRIMARY KEY,
  sender_id CHAR(36) NOT NULL,
  receiver_id CHAR(36) NOT NULL,
  message TEXT,
  sent_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(uuid),
  FOREIGN KEY (receiver_id) REFERENCES users(uuid)
);

CREATE TABLE educational_resources (
  uuid CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content_type ENUM('video', 'article', 'guide'),
  content_url TEXT,
  uploaded_by CHAR(36) NOT NULL,
  creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(uuid)
);
