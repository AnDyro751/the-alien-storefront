import * as Sentry from '@sentry/nextjs'


Sentry.init({
    dsn: "https://cab224cdca50477e8d7685fd9b8c3092@o458578.ingest.sentry.io/5759141",
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
})