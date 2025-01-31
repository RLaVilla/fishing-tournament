const API_URL = "https://fishing-tournament.onrender.com";

export async function getParticipants() {
  try {
    const response = await fetch(`${API_URL}/participants`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    return {};
  }
}

export async function loadParticipants() {
  const participants = await getParticipants();
  console.log("Loaded participants:", participants);
  return participants;
}

export async function updateParticipants(participants) {
  try {
    const response = await fetch(`${API_URL}/participants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participants),
    });
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error("Error updating participants:", error);
  }
}
