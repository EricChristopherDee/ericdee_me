let current_theme;

let theme_switch = 0;

function theme_swap() {
  if (theme_switch === 0) {
    let alternate_theme = document.getElementsByTagName("link").item(0);
    let default_theme = document.getElementsByTagName("link").item(1);
    current_theme = default_theme;
    document
      .getElementsByTagName("head")
      .item(0)
      .replaceChild(alternate_theme, default_theme);
    theme_switch = 1;
    return;
  }
  if (theme_switch === 1) {
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
