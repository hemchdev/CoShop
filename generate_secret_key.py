#!/usr/bin/env python
import secrets
import string

# Generate a secure SECRET_KEY
def generate_secret_key():
    """Generate a Django SECRET_KEY"""
    characters = string.ascii_letters + string.digits + string.punctuation
    # Exclude some special chars that might cause issues
    characters = characters.replace('"', '').replace("'", '').replace('\\', '')
    return ''.join(secrets.choice(characters) for _ in range(50))

if __name__ == '__main__':
    key = generate_secret_key()
    print(f"Generated SECRET_KEY:\n{key}\n")
    print("Add this to your .env file:")
    print(f"SECRET_KEY={key}")
