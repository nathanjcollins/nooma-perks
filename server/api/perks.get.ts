import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data: perks } = await client
    .from("perks")
    .select("id, name, description, limit");

  const { data: redemptions } = await client
    .from("redemptions")
    .select("perk_id");

  return perks?.map((perk) => ({
    id: perk.id as number,
    name: perk.name as string,
    description: perk.description as string,
    limit: perk.limit as number,
    redeemed:
      redemptions?.filter((redemption) => redemption.perk_id === perk.id)
        .length ?? 0,
    claimed: false,
    loading: false,
  }));
});
