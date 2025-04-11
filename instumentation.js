require('dotenv').config();

const { AzureMonitorTraceExporter } = require('@azure/monitor-opentelemetry-exporter');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');

const provider = new NodeTracerProvider();

// ✅ Use connection string from .env
const connectionString = process.env.APPINSIGHTS_CONNECTION_STRING;

const exporter = new AzureMonitorTraceExporter({
  connectionString: connectionString,
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

registerInstrumentations({
  tracerProvider: provider,
});