import { serverSupabaseClient } from "#supabase/server";
import sendGrid from "@sendgrid/mail";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);

  const perk = await client
    .from("perks")
    .select("name, description")
    .eq("id", query.id as never)
    .maybeSingle();

  if (!perk) {
    return false;
  }

  await client.from("redemptions").insert({ perk_id: query.id } as never);

  const sendGridApiKey = useRuntimeConfig().sendgridApiKey;
  sendGrid.setApiKey(sendGridApiKey);

  const msg = {
    to: "nathjcollins@gmail.com",
    from: "nathjcollins@gmail.com",
    subject: "Nooma Has Redeemed A Perk!",
    text: `Perk redeemed: ${perk.data?.name} - ${perk.data?.description}`,
  };

  await sendGrid.send(msg);

  return true;
});
