# Delete node_modules and package-lock.json first
rm -rf node_modules package-lock.json

# For Windows (Command Prompt)
rmdir /s node_modules
del package-lock.json

# For Windows (PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Then install with legacy peer deps to resolve conflicts
npm install --legacy-peer-deps

# Or alternatively, use force flag
npm install --force

# If you prefer yarn (often handles conflicts better)
npm install -g yarn
yarn install
