export const fetchPlaceSuggestions = async (
  input: string,
  apiKey: string
): Promise<{ description: string; place_id: string }[]> => {
  if (!input) return [];
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}&language=es`;
  const response = await fetch(url);
  const data = await response.json();
  return data.predictions?.map((p: any) => ({
    description: p.description,
    place_id: p.place_id,
  })) || [];
};