// export let participants = {
//   Donny: {
//     totalLength: 0,
//     catches: [],
//   },
//   Chris: {
//     totalLength: 0,
//     catches: [],
//   },
//   Braden: {
//     totalLength: 0,
//     catches: [],
//   },
//   Kevin: {
//     totalLength: 0,
//     catches: [],
//   },
//   Rob: {
//     totalLength: 0,
//     catches: [],
//   },
//   Pat: {
//     totalLength: 0,
//     catches: [],
//   },
//   Josh: {
//     totalLength: 0,
//     catches: [],
//   },
// };

const API_URL = "http://localhost:3000";

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
    const response = await fetch("http://localhost:3000/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participants),
    });
    const result = await response.json();
    console.log(result.message); // "Participants updated!"
  } catch (error) {
    console.error("Error updating participants:", error);
  }
}
