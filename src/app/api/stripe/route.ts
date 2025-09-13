import prisma from "@/lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET_KEY
    );
  } catch (error) {
    console.log("webhooks verfication failed", error);
    return Response.json(null, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email,
        },
        data: {
          hasAccess: true,
        },
      });
      break;
    default:
      console.log(`unhandled event type ${event.type}`);
  }

  return Response.json(null, { status: 200 });
}
