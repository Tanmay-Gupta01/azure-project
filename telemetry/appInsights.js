// console.log("Connection String from env:", process.env.APPINSIGHTS_CONNECTION_STRING);


// require("dotenv").config(); // Load environment variables from .env

// const { useAzureMonitor } = require("@azure/monitor-opentelemetry");

// if (!process.env.APPINSIGHTS_CONNECTION_STRING) {
//   console.error("❌ APPINSIGHTS_CONNECTION_STRING is missing in your .env file.");
//   process.exit(1); // Exit the app if the connection string is missing
// }

// // Initialize Azure Monitor OpenTelemetry using the connection string from .env
// useAzureMonitor({
//   // connectionString: process.env.APPINSIGHTS_CONNECTION_STRING
//   connectionString: process.env.APPINSIGHTS_CONNECTION_STRING
  
// });

// console.log("Azure Monitor initialized successfully!");




// require('dotenv').config(); // Load environment variables

// // Extract the connection string from the environment variable
// const connectionString = process.env.APPINSIGHTS_CONNECTION_STRING;
// const instrumentationKey = connectionString.split(';')[0].split('=')[1];

// // Log the extracted instrumentation key for debugging
// console.log("Extracted Instrumentation Key:", instrumentationKey);

// // Ensure the instrumentation key is valid
// if (!instrumentationKey) {
//   console.error("❌ Instrumentation Key not found in the connection string.");
//   process.exit(1);
// }

// // Now initialize the Azure Monitor OpenTelemetry with the connection string
// const { AzureMonitorOpenTelemetry } = require('@azure/monitor-opentelemetry');

// try {
//   new AzureMonitorOpenTelemetry({
//     connectionString: process.env.APPINSIGHTS_CONNECTION_STRING,
//   }).start();

//   console.log("Azure Monitor OpenTelemetry initialized successfully.");
// } catch (error) {
//   console.error("Error initializing Azure Monitor OpenTelemetry:", error.message);
// }


require('dotenv').config(); // Load environment variables

// Extract the connection string from the environment variable
const connectionString = process.env.APPINSIGHTS_CONNECTION_STRING;

// Log the connection string for debugging purposes
console.log("Connection String:", connectionString);

// Ensure the connection string exists
if (!connectionString) {
  console.error("❌ APPINSIGHTS_CONNECTION_STRING is missing.");
  process.exit(1);
}

// Import the OpenTelemetry package
const { useAzureMonitor, AzureMonitorOpenTelemetryOptions } = require("@azure/monitor-opentelemetry");

// Create a new AzureMonitorOpenTelemetryOptions object.
const options = {
  azureMonitorExporterOptions: {
    connectionString: "InstrumentationKey=86e91677-9236-4d16-a0da-1e43468dcaac;IngestionEndpoint=https://centralindia-0.in.applicationinsights.azure.com/;LiveEndpoint=https://centralindia.livediagnostics.monitor.azure.com/;ApplicationId=9a56bc9c-3855-4542-acbb-1220e1a8ff80"
  }
};
useAzureMonitor(options);

// Use the OpenTelemetry setup function to initialize Azure Monitor
// try {
//   useAzureMonitor({
//     connectionString: process.env.APPINSIGHTS_CONNECTION_STRING,
//   });

//   console.log("Azure Monitor OpenTelemetry initialized successfully.");
// } catch (error) {
//   console.error("Error initializing Azure Monitor OpenTelemetry:", error);
//   process.exit(1);
// }