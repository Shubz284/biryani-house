/**
 * Creates a URL path for a given page name
 * @param {string} pageName - The name of the page (e.g., "Home", "Menu", "Cart")
 * @returns {string} The URL path for the page
 */
export function createPageUrl(pageName) {
  const routes = {
    Home: "/",
    Menu: "/menu",
    Cart: "/cart",
    Checkout: "/checkout",
    Orders: "/orders",
  };

  return routes[pageName] || "/";
}
