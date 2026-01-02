<template>
  <div class="index-page">

    <!-- ================= HERO ================= -->
    <section class="hero-section">
      <div class="hero-content">
        <span class="badge">New Arrival - BST Hè 2025</span>
        <h1>Nâng Tầm Phong Cách <br /> Với T-Shirt Design</h1>
        <p>
          Khám phá bộ sưu tập áo thun 100% Cotton, form dáng hiện đại,
          bền màu và thoáng mát cho mọi hoạt động.
        </p>
        <div class="hero-btns">
          <button class="btn-primary">Xem bộ sưu tập</button>
          <button class="btn-outline">Săn Deal 20%</button>
        </div>
      </div>

      <div class="hero-image">
        <img
          src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
          alt="Fashion T-shirt"
          class="img-main"
        />
      </div>
    </section>

    <!-- ================= PRODUCTS ================= -->
    <section class="products-section">
      <h2 class="section-title">Áo Thun Nổi Bật</h2>

      <div class="product-grid">
        <div
          v-for="shirt in teeList"
          :key="shirt.id"
          class="product-card"
        >
          <div class="p-thumb">
            <img :src="shirt.image" :alt="shirt.name" class="img-product" />
            <div class="p-tag" v-if="shirt.hot">HOT</div>
          </div>

          <div class="p-info">
            <h3>{{ shirt.name }}</h3>
            <p class="price">{{ shirt.price }}</p>

            <button class="btn-add-cart" @click="addToCart(shirt)">
              THÊM VÀO GIỎ
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= REGISTER ================= -->
    <section class="registration-section">
      <div class="reg-container">

        <div class="reg-left-ads">
          <img
            src="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1000&auto=format&fit=crop"
            alt="Clothing Store"
          />
          <div class="ads-tag">Voucher 50k cho đơn đầu tiên!</div>
        </div>

        <div class="reg-right-form">
          <div class="form-wrapper">
            <h2 class="form-title">Đăng Ký Thành Viên</h2>
            <p class="form-desc">
              Trở thành khách hàng thân thiết để nhận thông báo về
              mẫu áo thun mới nhất và ưu đãi độc quyền.
            </p>

            <!-- FORM -->
            <form @submit.prevent="submitForm">
              <div class="form-row">
                <input v-model="form.firstName" class="custom-input" placeholder="Họ" />
                <input v-model="form.lastName" class="custom-input" placeholder="Tên" />
                <input v-model="form.email" type="email" class="custom-input" placeholder="Email" />
                <input v-model="form.phone" class="custom-input" placeholder="Số điện thoại" />
              </div>

              <textarea
                v-model="form.description"
                class="custom-textarea"
                placeholder="Ghi chú về size hoặc màu sắc bạn yêu thích"
              ></textarea>

              <button type="submit" class="btn-submit-reg">
                NHẬN ƯU ĐÃI NGAY
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "@/services/axios"

// ====================== STATE ======================
const teeList = ref([])

const form = ref({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  description: ""
})

// ====================== SUBMIT FORM ======================
const submitForm = async () => {
  if (!form.value.firstName || !form.value.phone) {
    alert("❗ Vui lòng nhập Họ và Số điện thoại")
    return
  }

  try {
    await api.post("/api/preference", form.value)

    alert("✅ Đăng ký thành công! Dữ liệu đã lưu Google Sheets.")

    form.value = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      description: ""
    }
  } catch (err) {
    console.error(err)
    alert("❌ Không thể gửi dữ liệu")
  }
}

// ====================== LOAD PRODUCTS ======================
const loadFeaturedProducts = async () => {
  const res = await api.get("/api/products")
  teeList.value = res.data.slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    rawPrice: p.price,
    price: Number(p.price).toLocaleString("vi-VN") + " đ",
    image: import.meta.env.VITE_API_BASE_URL + p.imageUrl,
    hot: p.isHot
  }))
}

// ====================== CART ======================
const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const item = cart.find(i => i.id === product.id)

  item ? item.quantity++ : cart.push({ ...product, quantity: 1 })
  localStorage.setItem("cart", JSON.stringify(cart))

  alert(`🛒 Đã thêm ${product.name}`)
}

onMounted(loadFeaturedProducts)
</script>



<style scoped>
/* TỔNG THỂ */
.index-page { width: 100%; overflow-x: hidden; background: #fff; font-family: 'Inter', sans-serif; }

/* 1. HERO SECTION */
.hero-section {
  background: #0b2c24; /* Màu xanh đậm chuẩn mẫu */
  color: white;
  display: flex;
  align-items: center;
  padding: 80px 10%;
  gap: 50px;
}
.hero-content { flex: 1; }
.badge { background: #cefe05; color: #0b2c24; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 0.85rem; }
.hero-content h1 { font-size: 3.5rem; margin: 25px 0; line-height: 1.1; }
.hero-content p { color: #cbd5e0; margin-bottom: 35px; font-size: 1.1rem; line-height: 1.6; }
.hero-btns { display: flex; gap: 20px; }
.btn-primary { background: #cefe05; border: none; padding: 14px 35px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: 0.3s; }
.btn-outline { background: transparent; border: 1.5px solid #cefe05; color: #cefe05; padding: 14px 35px; border-radius: 5px; cursor: pointer; }
.btn-primary:hover { background: #dfff40; transform: translateY(-3px); }

.hero-image { flex: 1; display: flex; justify-content: flex-end; }
.img-main {
  width: 450px;
  height: 550px;
  object-fit: cover;
  border-radius: 30px;
  border: 4px solid #cefe05; /* Viền vàng chanh */
  box-shadow: 0 30px 60px rgba(0,0,0,0.4);
}

/* 2. PRODUCTS SECTION */
.products-section { padding: 80px 10%; text-align: center; background: #fcfcfc; }
.section-title { font-size: 2.8rem; margin-bottom: 60px; color: #0b2c24; font-weight: 700; position: relative; }
.section-title::after { content: ''; width: 60px; height: 4px; background: #cefe05; position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); }

.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
.product-card { background: white; border-radius: 15px; overflow: hidden; transition: 0.4s; border: 1px solid #f0f0f0; }
.product-card:hover { transform: translateY(-15px); box-shadow: 0 20px 30px rgba(0,0,0,0.08); }

.p-thumb { height: 320px; position: relative; overflow: hidden; background: #f5f5f5; }
.img-product { width: 100%; height: 100%; object-fit: cover; transition: 0.6s; }
.product-card:hover .img-product { transform: scale(1.1); }
.p-tag { position: absolute; top: 15px; right: 15px; background: #ff4d4d; color: white; padding: 4px 12px; border-radius: 5px; font-size: 0.75rem; font-weight: bold; }

.p-info { padding: 20px; }
.p-info h3 { font-size: 1.1rem; margin-bottom: 10px; color: #2d3748; }
.price { color: #4a7c59; font-weight: 800; font-size: 1.2rem; margin-bottom: 15px; }


.btn-add-cart { 
  width: 100%; padding: 12px; border: 2px solid #0b2c24; background: transparent; 
  border-radius: 30px; font-weight: bold; cursor: pointer; transition: 0.3s;
}
.btn-add-cart:hover { background: #0b2c24; color: white; }

/* 3. REGISTRATION SECTION */
.registration-section { padding: 100px 10%; background: #fff; }
.reg-container { 
  display: flex; max-width: 1200px; margin: 0 auto; 
  background: #4a7c59; border-radius: 25px; overflow: hidden;  
  align-items: stretch; box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}
.reg-left-ads { flex: 1; position: relative; min-height: 500px; }
.reg-left-ads img { width: 100%; height: 100%; object-fit: cover; }
.ads-tag { position: absolute; bottom: 30px; left: 30px; background: #cefe05; color: #0b2c24; padding: 10px 20px; border-radius: 8px; font-weight: bold; }

.reg-right-form { flex: 1.2; padding: 60px; color: white; display: flex; align-items: center; }
.form-wrapper { width: 100%; }
.form-title { font-size: 2.2rem; margin-bottom: 15px; font-weight: 700; }
.form-desc { font-size: 1rem; margin-bottom: 35px; color: #e2e8f0; line-height: 1.5; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.custom-input, .custom-textarea { width: 100%; padding: 15px 20px; border-radius: 10px; border: none; outline: none; background: #ffffff; color: #333; font-size: 1rem; }
.custom-textarea { height: 120px; resize: none; margin-top: 20px; margin-bottom: 30px; }

.btn-submit-reg { 
  width: 100%; background: #cefe05; color: #0b2c24; border: none; 
  padding: 18px; border-radius: 50px; font-weight: 800; font-size: 1.2rem; 
  cursor: pointer; transition: 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.btn-submit-reg:hover { background: #dfff40; transform: scale(1.02); }

/* Responsive */
@media (max-width: 1100px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-section { padding: 60px 5%; }
}
@media (max-width: 850px) {
  .hero-section { flex-direction: column; text-align: center; }
  .hero-image { display: none; }
  .reg-container { flex-direction: column; }
  .reg-left-ads { min-height: 300px; }
}
</style>