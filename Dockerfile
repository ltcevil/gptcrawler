
FROM ubuntu:jammy


ENV GIT_PYTHON_REFRESH=quiet
ENV PLAYWRIGHT_BROWSERS_ROOT=/root/.cache/ms-playwright \
    BROWSER_CACHE_ROOT=/root/.cache/ms-playwright \
    BROWSER_CACHE_LINK=/root/.cache/ms-playwright/current \
    PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright/current \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    YARN_ENABLE_PROGRESS_BARS=false \
    DEBIAN_FRONTEND=noninteractive \
    TZ=Europe/Budapest \
    LANG=en_US.utf8 \
    PATH="/root/.npm-global/bin:/usr/sbin:/usr/lib/google-cloud-sdk/bin:/root/node_modules/.bin:/root/.cache/ms-playwright/current:/root/.cache/ms-playwright:/usr/local/bin:/root/.local/bin:/usr/local/lib/python3.12/bin:/root/.cargo/bin/bin:/usr/local/bin:/root/.local/bin:/usr/bin:/code/bin:/usr/local/lib/python3.12/bin:/usr/local/lib/python3/bin:/root/.cache/ms-playwright/chrome-linux64:/root/.cache/ms-playwright/chromedriver-linux64:/code/bin:/host/usr/local/bin:/code/gpt-crawler/bin"

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
    npx playwright install-deps && \
    npx playwright install chrome webkit ffmpeg --force

# Build the project locally
RUN npm run build

# Ensure the data directory is available for output
VOLUME /code/data

# Start the server
CMD ["npm", "run", "start:server:prod"]
