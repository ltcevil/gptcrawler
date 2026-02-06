# Specify the base Docker image.
FROM apify/actor-node-playwright-chrome:18

# Set working directory
WORKDIR /home/myuser

# Install curl for Telegram notifications
USER root
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
USER myuser

# Copy package files
COPY --chown=myuser package*.json ./

# Delete the prepare script.
RUN npm pkg delete scripts.prepare

# Install all dependencies (including dev for build)
# Using --ignore-scripts to prevent playwright from breaking the build
RUN npm install --audit=false --ignore-scripts

# Copy the rest of the source code
COPY --chown=myuser . ./

# Build the project locally
RUN npm run build

# Force install playwright browsers inside the container to ensure isolation
RUN npx playwright install --with-deps chrome webkit ffmpeg

# Create data directory for local mounting
RUN mkdir -p data

# Run the image starting the server
CMD ./start_xvfb_and_run_cmd.sh && npm run start:server:prod --silent