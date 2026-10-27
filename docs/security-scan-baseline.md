# Security scan baseline — Makor Chochma

> Date: 2026-10-27 · Target: https://makor-chochma.vercel.app  
> Method: HTTP header + surface probe  
> Note: Full OWASP ZAP spider+active scan remains an ops step before custom-domain Go-Live (`docs/ops-security-checklist.md` §G).

## 1. Security headers (GET /)

- PASS `strict-transport-security`
- PASS `x-frame-options: DENY`
- PASS `x-content-type-options: nosniff`
- PASS `content-security-policy-report-only`
- PASS `referrer-policy`
- PASS `permissions-policy`
- PASS `cross-origin-opener-policy`
- PASS no `x-powered-by`

## 2. /api/health

- PASS status 200, body `OK` only, `Cache-Control: private, no-store`

## 3. Sensitive surfaces

- PASS `/api/revalidate` → 404
- PASS `/.env` → 404
- PASS `/admin` → 404
- PASS `/account` → 404

## 4. security.txt

- PASS `/.well-known/security.txt` present

## Verdict

Baseline probe: **PASS**. Full ZAP: **pending ops** before custom domain.
