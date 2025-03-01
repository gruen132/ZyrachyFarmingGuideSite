import os
import re

# Define the base directory for the search
base_dir = '.'

# Define the pattern to search for
pattern = re.compile(r'<span class="patch-version">Patch: (.*?)</span>')

# Define the new patch version
new_patch_version = "0.16.1.3"  # Update this string with the desired patch version

# Function to update patch version in a file
def update_patch_version_in_file(file_path, new_patch_version):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    replacement = f'<span class="patch-version">Patch: {new_patch_version}</span>'
    updated_content = pattern.sub(replacement, content)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)

# Walk through the directory and update patch version in .html files
def update_patch_version_in_all_files(new_patch_version):
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                update_patch_version_in_file(file_path, new_patch_version)

if __name__ == "__main__":
    update_patch_version_in_all_files(new_patch_version)
    print(f"Patch version updated to {new_patch_version} in all .html files.")