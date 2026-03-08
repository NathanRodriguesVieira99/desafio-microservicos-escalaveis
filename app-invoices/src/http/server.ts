import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import "../broker/consumer.ts";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: "*" });

app.get("/health", () => {
  return "OK";
});

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.log("[Invoices] Http Server running!");
});
