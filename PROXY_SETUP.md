# Proxy Configuration Guide

## ⚠️ Important Limitation

**Chromium/Playwright does NOT support SOCKS5 proxies with authentication.**

This is a known Chromium limitation, not a bug in gptcrawler.

## Supported Proxy Types

✅ **HTTP** with authentication: `http://user:pass@host:port`
✅ **HTTPS** with authentication: `https://user:pass@host:port`
❌ **SOCKS5** with authentication: NOT SUPPORTED by Chromium
✅ **SOCKS5** without authentication: `socks5://host:port`

## Workaround for SOCKS5 with Auth

### Option 1: Use HTTP Proxy Converter

Set up a local HTTP proxy that connects to your SOCKS5 proxy:

```bash
# Install 3proxy (lightweight proxy server)
docker exec -it gptcrawler apt-get update && apt-get install -y 3proxy

# Create config file
cat > /tmp/3proxy.cfg << 'EOC'
auth strong
users evil:CL:Pokemon21
proxy -p8888 -a
EOC

# Run 3proxy (converts HTTP to SOCKS5)
docker exec -d gptcrawler 3proxy /tmp/3proxy.cfg

# Update .env to use local HTTP proxy
PROXY_URLS=http://evil:Pokemon21@localhost:8888
```

### Option 2: Use SSH Tunnel

```bash
# Create SSH tunnel
ssh -D 1080 -N user@your-server

# Use in .env (no auth)
PROXY_URLS=socks5://localhost:1080
```

### Option 3: Use Squid Proxy

```bash
# Run Squid as HTTP→SOCKS5 converter
docker run -d --name squid \
  -p 3128:3128 \
  -e SOCKS5_SERVER=5.159.232.111:1080 \
  -e SOCKS5_USER=socksevil \
  -e SOCKS5_PASS=ui54pm21 \
  ubuntu/squid

# Update .env
PROXY_URLS=http://localhost:3128
```

## Current Configuration

Your proxies require authentication, so they won't work directly with Playwright.

**Original SOCKS5 proxies:**
1. socks5://socksevil:ui54pm21@5.159.232.111:1080
2. socks5://evil:Pokemon21@gpt.evils.live:1080
3. socks5://socksevil:ui54pm21@5.159.232.116:1080

**Recommended:** Set up an HTTP proxy converter or disable proxy for now.

## Disable Proxies

To run without proxies, edit `.env`:

```bash
# Comment out or leave empty
PROXY_URLS=
```

Then restart: `docker compose restart`
