-- Create database
CREATE DATABASE IF NOT EXISTS trivia_game;
USE trivia_game;

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  score INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard', 'expert') NOT NULL,
  points INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  image_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (package_id) REFERENCES packages(id)
);

-- Game Sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  team1_id INT NOT NULL,
  team2_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (team1_id) REFERENCES teams(id),
  FOREIGN KEY (team2_id) REFERENCES teams(id)
);

-- Responses table
CREATE TABLE IF NOT EXISTS responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  team_id INT NOT NULL,
  question_id INT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id),
  FOREIGN KEY (team_id) REFERENCES teams(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Insert sample categories
INSERT INTO categories (name) VALUES 
  ('History'),
  ('Science'),
  ('Geography'),
  ('Entertainment'),
  ('Sports'),
  ('Art & Literature');

-- Insert sample packages
INSERT INTO packages (category_id, difficulty, points) VALUES
  (1, 'easy', 100),
  (1, 'medium', 200),
  (1, 'hard', 300),
  (1, 'expert', 400),
  (2, 'easy', 100),
  (2, 'medium', 200),
  (2, 'hard', 300),
  (2, 'expert', 400),
  (3, 'easy', 100),
  (3, 'medium', 200),
  (3, 'hard', 300),
  (3, 'expert', 400),
  (4, 'easy', 100),
  (4, 'medium', 200),
  (4, 'hard', 300),
  (4, 'expert', 400);

-- Insert sample questions
INSERT INTO questions (package_id, question, answer) VALUES
  (1, 'Who was the first president of the United States?', 'George Washington'),
  (2, 'In what year did World War II end?', '1945'),
  (3, 'Which empire was ruled by Genghis Khan?', 'Mongol Empire'),
  (4, 'Who painted the Mona Lisa?', 'Leonardo da Vinci'),
  (5, 'What is the chemical symbol for gold?', 'Au'),
  (6, 'What is the closest planet to the Sun?', 'Mercury'),
  (7, 'What is the hardest natural substance on Earth?', 'Diamond'),
  (8, 'What is the largest organ in the human body?', 'Skin'),
  (9, 'What is the capital of Japan?', 'Tokyo'),
  (10, 'Which is the largest ocean on Earth?', 'Pacific Ocean'),
  (11, 'Which country is known as the Land of Fire and Ice?', 'Iceland'),
  (12, 'What is the longest river in the world?', 'Nile'),
  (13, 'Who played Iron Man in the Marvel Cinematic Universe?', 'Robert Downey Jr.'),
  (14, 'Which band performed the song "Bohemian Rhapsody"?', 'Queen'),
  (15, 'What was the highest-grossing film of all time before adjusting for inflation?', 'Avatar'),
  (16, 'Who wrote the Harry Potter series?', 'J.K. Rowling');

