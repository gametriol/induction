import { createRoot } from "react-dom/client";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

(async () => {
	try {
		const { default: App } = await import("./App");
		root.render(
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		);
	} catch (err) {
		console.error('Failed to load App module:', err);
		// Render a visible error so the page is not blank and user sees details
		root.render(
			<div style={{ padding: 24 }}>
				<h1 style={{ color: 'red' }}>Failed to load application</h1>
				<pre style={{ whiteSpace: 'pre-wrap' }}>{String(err)}</pre>
			</div>
		);
	}
})();
