<!-- common.js -->
<script>
// === Parse Initialization (Back4App) ===
Parse.initialize("JntBzRh42hSe74SIbVM1CQZr2D51YcVbDKcH60m6", "yxn7Yup1UUZildFxcG8a0gmZmUBFEkBwD6gfP702");
Parse.serverURL = 'https://parseapi.back4app.com/';

/**
 * Utility: Ensure that the "Ward" class exists and, if empty, create
 * nine default wards named "Ward A" through "Ward I". Each Ward object has:
 *    - code: "WardA", "WardB", ..., "WardI"
 *    - name: "Ward A", "Ward B", ..., "Ward I"
 */
async function ensureDefaultWards() {
  const Ward = Parse.Object.extend("Ward");
  const query = new Parse.Query(Ward);
  // Check if any ward exists
  const count = await query.count();
  if (count === 0) {
    const defaultNames = ["Ward A","Ward B","Ward C","Ward D","Ward E","Ward F","Ward G","Ward H","Ward I"];
    const promises = defaultNames.map((displayName, idx) => {
      const wardObj = new Ward();
      const code = "Ward" + displayName.split(" ")[1]; // e.g. "WardA"
      wardObj.set("code", code);
      wardObj.set("name", displayName);
      return wardObj.save();
    });
    await Promise.all(promises);
  }
}

/**
 * Returns a list of all Ward objects, sorted by their code (WardA, WardB, ...)
 * Each element is { id, code, name }
 */
async function loadAllWards() {
  const Ward = Parse.Object.extend("Ward");
  const query = new Parse.Query(Ward);
  query.ascending("code");
  const results = await query.find();
  return results.map(w => ({
    id: w.id,
    code: w.get("code"),   // e.g. "WardA"
    name: w.get("name")    // e.g. "Ward A"
  }));
}

/**
 * Update a ward’s display name (by its objectId).
 * @param {string} wardId 
 * @param {string} newName 
 */
async function updateWardName(wardId, newName) {
  const Ward = Parse.Object.extend("Ward");
  const wardObj = new Ward();
  wardObj.set("objectId", wardId);
  wardObj.set("name", newName);
  return wardObj.save();
}

/**
 * Utility: Redirect to a given URL
 */
function goTo(url) {
  window.location.href = url;
}

// Shared: Format ISO date → local string
function formatDateTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleString();
}
</script>
