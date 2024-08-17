import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductDetailsView from "@/views/ProductDetailsView.vue";
import PremiumPageView from "@/views/PremiumPageView.vue";
import ProductsPageView from "@/views/ProductsPageView.vue";
import CommunityPageView from "@/views/CommunityPageView.vue";
import AssemblyInstructionsView from "@/views/AssemblyInstructionsView.vue";
import ProductRegistrationVie from "@/views/ProductRegistrationView.vue";
import ReturnsExchangesPolicyView from "@/views/ReturnsExchangesPolicyView.vue";
import WarrantyPolicyView from "@/views/WarrantyPolicyView.vue";
import AboutUsView from "@/views/AboutUsView.vue";
import ContactUsView from "@/views/ContactUsView.vue";
import WhereToBuyView from "@/views/WhereToBuyView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterAccountView from "@/views/RegisterAccountView.vue";
import ProfileAccountView from "@/views/ProfileAccountView.vue";
import { useAuthStore } from "@/stores/auth";
import AddProductView from "@/views/AddProductView.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";
import EditProductView from "@/views/EditProductView.vue";
import CartView from "@/views/CartView.vue";
import CheckOutView from "@/views/CheckOutView.vue";
import ProductsCollectionView from "@/views/ProductsCollectionView.vue";
import AddressesView from "@/views/AddressesView.vue";
import { useCartStore } from "@/stores/cartStore";
import SearchedProducts from "@/views/SearchedProducts.vue";
import UsersOrdersView from "@/views/UsersOrdersView.vue";
import OrderDetailsView from "@/views/OrderDetailsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pages/okayama",
      name: "pages",
      component: PremiumPageView,
    },
    {
      path: "/products/:name/:id",
      name: "product",
      component: ProductDetailsView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductsPageView,
    },
    {
      path: "/products/collection/:name",
      name: "productsCollection",
      component: ProductsCollectionView,
    },
    {
      path: "/products/collection/:name/:id",
      name: "productDetailsView",
      component: ProductDetailsView,
    },
    {
      path: "/pages/register-affiliate-account",
      name: "registerAffiliateAccount",
      component: CommunityPageView,
    },
    {
      path: "/pages/assembly-instructions",
      name: "assemblyInstructions",
      component: AssemblyInstructionsView,
    },
    {
      path: "/pages/product-registration",
      name: "productRegistration",
      component: ProductRegistrationVie,
    },
    {
      path: "/search",
      name: "searchedProducts",
      component: SearchedProducts,
    },
    {
      path: "/pages/returns-exchanges-policy",
      name: "returnsExchanges",
      component: ReturnsExchangesPolicyView,
    },
    {
      path: "/pages/warranty-policy",
      name: "warrantyPolicy",
      component: WarrantyPolicyView,
    },
    {
      path: "/pages/about-us",
      name: "aboutUs",
      component: AboutUsView,
    },
    {
      path: "/pages/contact-us",
      name: "contactUs",
      component: ContactUsView,
    },
    {
      path: "/pages/where-to-buy",
      name: "whereToBuy",
      component: WhereToBuyView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterAccountView,
    },
    {
      path: "/profile",
      name: "profileAccount",
      component: ProfileAccountView,
    },
    {
      path: "/usersOrders",
      name: "usersOrders",
      component: UsersOrdersView,
    },
    {
      path: "/userOrders/:userId/:orderId",
      name: "orderDetailsView",
      component: OrderDetailsView,
      props: true,
    },
    {
      path: "/profile/addresses",
      name: "profileAddresses",
      component: AddressesView,
    },
    {
      path: "/addProduct",
      name: "addProduct",
      component: AddProductView,
      meta: { requiresAdmin: true },
    },
    {
      path: "/editProduct/:id",
      name: "editProduct",
      component: EditProductView,
      meta: { requiresAdmin: true },
    },
    {
      path: "/adminPanel",
      name: "adminPanel",
      component: AdminPanelView,
      meta: { requiresAdmin: true },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckOutView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  if (to.path === "/login" && authStore?.user?._id) {
    return next({ path: "/profile" });
  }
  if (to.meta.requiresAdmin && !authStore?.user?.isAdmin) {
    return next({ path: "/" });
  }
  if (to.path === "/checkout" && !cartStore.hasItemsInBasket) {
    return next({ path: "/" });
  }
  if (to.path === "/usersOrders" & authStore?.user) {
    return next({ path: "/" });
  }
  next();
});

export default router;
