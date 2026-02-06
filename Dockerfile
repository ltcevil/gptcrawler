FROM ubuntu:jammy
ENV GIT_PYTHON_REFRESH=quiet
# Set a non-interactive frontend for automated setups.
ARG DEBIAN_FRONTEND=noninteractive

# Install Git and tools
RUN apt-get update && \
    apt-get install sudo -y && \
    apt-get install git curl wget telnet rsync procps nano mc -y

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Setup directory structure
RUN mkdir /code
RUN cd /code && mkdir data && mkdir gpt-crawler
WORKDIR /code/gpt-crawler

# Copy source code
COPY . .

# Install dependencies and isolated playwright browsers
RUN npm i && \
    npx playwright install chrome webkit ffmpeg && \
    npx playwright install-deps

# Build the project locally
RUN npm run build

# Ensure the data directory is available for output
VOLUME /code/data

# Start the server
CMD ["npm", "run", "start:server:prod"]
