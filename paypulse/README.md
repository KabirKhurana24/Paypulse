# PayPulse — Payment Performance & Reconciliation Intelligence

A self-contained React + Vite portfolio prototype for exploring payment operations workflows. It uses illustrative demo data only; it is not connected to live payment gateways, a bank, a settlement feed, or a production ledger.

## Included workflows

- **Payments overview:** payment volume, success rate, failed transactions, reconciliation match rate, gateway mix, and operational insights.
- **Transactions:** keyword search, status and gateway filters, CSV import, and CSV export.
- **Gateway analytics:** side-by-side comparison of success rate, latency, indicative fees, and processed volume.
- **Decline intelligence:** standardised decline categories and recommended recovery playbooks.
- **Reconciliation:** sample gateway settlement lines, variance review, and resolve actions.
- **Routing lab:** illustrative Balanced, Maximise success, and Minimise cost routing scenarios.

## Run on Windows

1. Install Node.js (LTS) from https://nodejs.org/.
2. Extract this ZIP to a normal writable folder.
3. Double-click `run.bat`.
4. On the first run, the script installs dependencies. It then starts Vite and opens `http://127.0.0.1:5173` in your browser.
5. Keep the terminal window open while using the app. Press `Ctrl+C` in that window to stop it.

You can also run it manually:

```bash
npm install
npm run dev
```

## Build check

```bash
npm install
npm run build
```

The production-ready static site is generated in `dist/`.

## CSV import format

The Import CSV action accepts common transaction field names. Recommended columns:

```csv
id,customer,email,amount,currency,gateway,method,status,date,time,reference,reason
TXN-1001,Sample Customer,sample@example.com,1250,INR,Razorpay,UPI,Success,25 Nov 2026,10:30:00,ORD-1001,
TXN-1002,Another Customer,another@example.com,900,INR,Cashfree,Cards,Failed,25 Nov 2026,10:31:00,ORD-1002,Do not honor
```

The importer also recognises common aliases such as `transaction_id`, `amount_inr`, `processor`, `payment_method`, `order_id`, and `failure_reason`.

## Important limitations

- Numbers, gateways, decline reasons, customer identities, and settlement records are synthetic demo content.
- CSV imports are held in browser memory for the current session; refreshing the page resets the imported records.
- There is no authentication, backend, multi-user database, real gateway API, real settlement integration, or live routing execution.
- Routing outcomes and recovery estimates are illustrative assumptions and must not be used as production financial advice or payment instructions.
- The app is intended for a portfolio walkthrough and product discussion, not operational use.
