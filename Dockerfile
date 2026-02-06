# Specify the base Docker image.
FROM apify/actor-node-playwright-chrome:18 AS builder

# Copy just package.json and package-lock.json
COPY --chown=myuser package*.json ./

# Delete the prepare script.
RUN npm pkg delete scripts.prepare

# Install all dependencies with --ignore-scripts to skip preinstall
RUN npm install --include=dev --audit=false --ignore-scripts

# Next, copy the source files
COPY --chown=myuser . ./

# Build the project
RUN npm run build

# Create final image
FROM apify/actor-node-playwright-chrome:18

# Install curl for Telegram notifications
USER root
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
USER myuser

# Copy only built JS files from builder image
COPY --from=builder --chown=myuser /home/myuser/dist ./dist

# Copy package.json
COPY --chown=myuser package*.json ./

# Install NPM packages (prod only)
RUN npm pkg delete scripts.prepare \
    && npm --quiet set progress=false \
    && npm install --omit=dev --omit=optional --ignore-scripts

# Force install playwright browsers inside the container to ensure isolation
RUN npx playwright install --with-deps chrome webkit ffmpeg

# Next, copy the remaining files
COPY --chown=myuser . ./

# Create data directory
RUN mkdir -p data

# Run the image.
CMD ./start_xvfb_and_run_cmd.sh && npm run start:server:prod --silent
