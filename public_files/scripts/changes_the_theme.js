let current_theme;

let theme_switch = session.getItem("theme_accumulator");

console.log("Current session gate: " + theme_switch);

function theme_swap() {
  // Session resets after first reload. Not sure why.
  theme_switch = session.getItem("theme_accumulator");

  if (theme_switch === "0") {
    let alternate_theme = document.getElementsByTagName("link").item(0);
    let default_theme = document.getElementsByTagName("link").item(1);
    current_theme = default_theme;
    document
      .getElementsByTagName("head")
      .item(0)
      .replaceChild(alternate_theme, default_theme);
    session.setItem("theme_accumulator", "1");
    location.reload;
  }
  if (theme_switch === "1") {
    let volatile_theme = document.getElementsByTagName("link").item(0);
    let switch_theme = current_theme;
    current_theme = volatile_theme;
    document
      .getElementsByTagName("head")
      .item(0)
      .replaceChild(switch_theme, volatile_theme);
    return;
  }
}
