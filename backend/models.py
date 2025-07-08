# models.py

import sqlite3

def create_users_table():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Optional: You can define a helper class for user data (not required by SQLite but useful in Python)
class User:
    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password
