import { createRouter, createWebHistory } from "vue-router"

// ===== LAYOUTS =====
import MainLayout from "../components/Layout/MainLayout.vue"
import AdminLayout from "../components/Layout/AdminLayout.vue"

// ===== PUBLIC PAGES =====
import Home from "../views/Home/IndexView.vue"
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"

const routes = [
  // ===== USER / PUBLIC =====
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "products",
        name: "ProductPage",
        component: () =>
          import("../views/product/ProductPage.vue")
      },
      {
        path: "cart",
        name: "Cart",
        component: () =>
          import("../views/CartView.vue")
      },
      {
        // ✅ CHECKOUT PAGE (FORM RIÊNG BIỆT)
        path: "checkout",
        name: "Checkout",
        component: () =>
          import("../views/CheckoutPage.vue"),
        meta: { requiresAuth: true }
      }
    ]
  },

  // ===== AUTH =====
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },

  // ===== ADMIN =====
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard"
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () =>
          import("../pages/admin/dashboard/Dashboard.vue")
      },
      {
        path: "products",
        name: "AdminProductList",
        component: () =>
          import("../pages/admin/product/ProductList.vue")
      },
      {
        path: "products/create",
        name: "AdminProductCreate",
        component: () =>
          import("../pages/admin/product/CreateProduct.vue")
      },
      {
        path: "products/edit/:id",
        name: "AdminProductEdit",
        component: () =>
          import("../pages/admin/product/EditProduct.vue")
      },
      {
        path: "orders",
        name: "OrderManagement",
        component: () =>
          import("../pages/admin/order/OrderManagement.vue")
      },
      {
        path: "categories",
        component: () =>
          import("../pages/admin/categories/CategoryList.vue")
      },
      {
        path: "categories/create",
        component: () =>
          import("../pages/admin/categories/CreateCategory.vue")
      },
      {
        path: "categories/edit/:id",
        component: () =>
          import("../pages/admin/categories/EditCategory.vue")
      }
    ]
  },

  // ===== 404 =====
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ===== ROUTER GUARD =====
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("role")
  const user = localStorage.getItem("user")

  // 🔐 ADMIN GUARD
  if (to.meta.requiresAdmin && role?.toLowerCase() !== "admin") {
    return next("/")
  }

  // 🔐 USER LOGIN GUARD (CHECKOUT)
  if (to.meta.requiresAuth && !user) {
    return next("/login")
  }

  next()
})

export default router
