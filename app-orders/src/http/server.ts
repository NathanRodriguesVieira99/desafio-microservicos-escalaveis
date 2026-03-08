import { randomUUID } from "node:crypto";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { z } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { schema } from "../db/schema/index.ts";
import { db } from "../db/client.ts";
import { dispatchOrderCreated } from "../broker/messages/order-created.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: "*" });

app.get("/health", () => {
  return "OK";
});

app.post(
  "/orders",
  {
    schema: {
      body: z.object({
        amount: z.coerce.number(),
      }),
    },
  },
  async (request, reply) => {
    const { amount } = request.body;

    console.log("Creating an order with amount", amount);

    const orderId = randomUUID();

    dispatchOrderCreated({
      orderId,
      amount,
      customer: {
        id: "b3822a8b-7973-4d49-a3f8-9ca3740f5e18",
      },
    });

    try {
      await db.insert(schema.orders).values({
        id: randomUUID(),
        costumerId: "b3822a8b-7973-4d49-a3f8-9ca3740f5e18",
        amount,
      });
    } catch (err) {
      console.error(err);
    }

    return reply.status(201).send();
  },
);

app.listen({ host: "0.0.0.0", port: 3334 }).then(() => {
  console.log("[Orders] Http Server running!");
});
