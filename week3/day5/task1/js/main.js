import { DarkMode } from "./components/darkMode.js";
import { Drawer } from "./components/nav.js";
import { keystroke } from "./components/key.js";
import { Scroll } from "./components/scroll.js";
import { BackToTop } from "./components/backtop.js";
import { validator } from "./components/formvalidator.js";
import { fetchService } from "./components/fetch.js";
import { liveSearch } from "./components/livesearch.js";
import { fetchUser } from "./components/fetch.js";
import { fetchRecentPosts } from "./components/fetch.js";
DarkMode();
Drawer();
keystroke();
Scroll();
BackToTop();
validator();
fetchService();
setTimeout(() => { liveSearch();}, 1000)
fetchUser();
fetchRecentPosts();

