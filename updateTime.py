import os
import re
from datetime import datetime

# Define the base directory for the search
base_dir = '.'

# Define the pattern to search for
pattern = re.compile(r'<span class="update-time">Last updated: (.*?) UTC</span>')

# Get the current UTC time
current_time = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')

# Define the replacement string with the current time
replacement = f'<span class="update-time">Last updated: {current_time} UTC</span>'

# Function to update timestamps in a file
def update_timestamp_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    updated_content = pattern.sub(replacement, content)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)

# Walk through the directory and update timestamps in .html files
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            update_timestamp_in_file(file_path)

print(f"Timestamps updated to {current_time} UTC in all .html files.")