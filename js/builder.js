// Build Your Own Bug Sundae logic.
const SCOOP_PRICE = 4.5;
const SWARM_PRICE = 1.75;

const BUG_TOPPINGS = [
  { name: "Dried mealworms", price: 0.75 },
  { name: "Grasshopper legs", price: 0.95 },
  { name: "Chocolate covered ladybugs", price: 1.25 },
  { name: "Candied crickets", price: 0.85 },
  { name: "Ant sprinkles", price: 0.5 },
  { name: "Roasted beetle bits", price: 0.9 },
  { name: "Jerusalem cricket halves", price: 1.5 },
  { name: "Gummy earthworms (real worms, gummied)", price: 1.1 },
  { name: "Cicada wing crisps", price: 0.8 },
  { name: "Centipede curls", price: 1.6 },
];

const EXTRAS = [
  { name: "Whipped cream", price: 0.5 },
  { name: "Hot fudge", price: 0.75 },
  { name: "Caramel drizzle", price: 0.75 },
  { name: "Honey with the comb", price: 1.0 },
  { name: "Rainbow sprinkles", price: 0.5 },
  { name: "Maraschino cherry", price: 0.25 },
  { name: "Waffle cone shards", price: 0.6 },
  { name: "Crushed peanuts", price: 0.5 },
  { name: "One normal gummy worm (candy, we promise)", price: 0.3 },
];

function money(n) {
  return "$" + n.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  const flavorSelect = document.getElementById("flavor-select");
  const bugBox = document.getElementById("bug-toppings");
  const extraBox = document.getElementById("extras");
  const scoopsInput = document.getElementById("scoops");
  const swarmInput = document.getElementById("swarm");
  const summaryList = document.getElementById("summary-list");
  const totalEl = document.getElementById("total");
  const orderButton = document.getElementById("order-button");
  const confirmation = document.getElementById("confirmation");

  // Flavor dropdown grouped by category, from the shared catalog.
  FLAVOR_CATEGORIES.forEach((cat) => {
    const group = document.createElement("optgroup");
    group.label = cat.name;
    cat.flavors.forEach((flavor) => {
      const opt = document.createElement("option");
      opt.value = flavor.name;
      opt.textContent = flavor.name + " (" + flavor.bugs + ")";
      group.appendChild(opt);
    });
    flavorSelect.appendChild(group);
  });

  function checkboxRow(item, groupName) {
    const label = document.createElement("label");
    label.className = "flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm hover:bg-sunny/20";
    label.innerHTML = `
      <span class="flex items-center gap-3">
        <input type="checkbox" name="${groupName}" class="h-5 w-5 accent-pink-500">
        <span class="font-semibold"></span>
      </span>
      <span class="text-sm font-bold text-buggy"></span>
    `;
    label.querySelector("span span:last-child").textContent = item.name;
    label.querySelector("span.text-sm").textContent = money(item.price);
    const input = label.querySelector("input");
    input.value = item.name;
    input.dataset.price = item.price;
    input.addEventListener("change", update);
    return label;
  }

  BUG_TOPPINGS.forEach((t) => bugBox.appendChild(checkboxRow(t, "bug")));
  EXTRAS.forEach((t) => extraBox.appendChild(checkboxRow(t, "extra")));

  function selected(groupName) {
    return [...document.querySelectorAll(`input[name="${groupName}"]:checked`)];
  }

  function update() {
    const scoops = Math.min(3, Math.max(1, parseInt(scoopsInput.value, 10) || 1));
    scoopsInput.value = scoops;
    const bugs = selected("bug");
    const extras = selected("extra");
    const swarmed = swarmInput.checked;

    let total = scoops * SCOOP_PRICE;
    const lines = [];
    lines.push(`${scoops} scoop${scoops > 1 ? "s" : ""} of ${flavorSelect.value} (${money(scoops * SCOOP_PRICE)})`);

    bugs.forEach((b) => {
      const price = parseFloat(b.dataset.price);
      total += price;
      lines.push(`${b.value}${swarmed ? " (swarmed: double bugs)" : ""} (${money(price)})`);
    });
    extras.forEach((e) => {
      const price = parseFloat(e.dataset.price);
      total += price;
      lines.push(`${e.value} (${money(price)})`);
    });
    if (swarmed) {
      total += SWARM_PRICE;
      lines.push(`Swarm It: double the bugs everywhere (${money(SWARM_PRICE)})`);
    }

    summaryList.innerHTML = "";
    lines.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      summaryList.appendChild(li);
    });
    totalEl.textContent = money(total);
    confirmation.classList.add("hidden");
  }

  flavorSelect.addEventListener("change", update);
  scoopsInput.addEventListener("input", update);
  swarmInput.addEventListener("change", update);

  orderButton.addEventListener("click", () => {
    const bugCount = selected("bug").length;
    let note;
    if (bugCount === 0) {
      note = "No bug toppings? Bold. The base flavor has plenty, don't worry.";
    } else if (swarmInput.checked) {
      note = "A swarmed sundae with " + bugCount + " bug topping" + (bugCount > 1 ? "s" : "") + ". Lenny is going to frame this receipt.";
    } else {
      note = "Solid build. The " + selected("bug")[0].value.toLowerCase() + " will not survive the first minute.";
    }
    confirmation.textContent = "Order placed! Pick it up at the counter under the name Beetlejuice. " + note;
    confirmation.classList.remove("hidden");
    confirmation.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  update();
});
