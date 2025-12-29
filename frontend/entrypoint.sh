#!/bin/sh
set -e  # Exit if any command fails

# Load secrets into environment variables
export DATABASE_URL=$(cat /run/secrets/database_url)
export AUTH_SECRET=$(cat /run/secrets/auth_secret)
export AUTH_DEBUG=$(cat /run/secrets/auth_debug)
export AUTH_TRUST_HOST=$(cat /run/secrets/auth_trust_host)
export AUTH_GOOGLE_ID=$(cat /run/secrets/auth_google_id)
export AUTH_GOOGLE_SECRET=$(cat /run/secrets/auth_google_secret)
export AUTH_GITHUB_ID=$(cat /run/secrets/auth_github_id)
export AUTH_GITHUB_SECRET=$(cat /run/secrets/auth_github_secret)
export AUTH_RESEND_KEY=$(cat /run/secrets/auth_resend_key)
export AWS_ACCESS_KEY_ID=$(cat /run/secrets/aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(cat /run/secrets/aws_secret_access_key)
export POSTGRES_PASSWORD=$(cat /run/secrets/postgres_password)
export AUTH_URL=$(cat /run/secrets/auth_url)

# Run Prisma migrations
npx prisma migrate deploy

exec npm start