// database.js

document.addEventListener("alpine:init", () => {
    Alpine.data("produkToko", () => {
      return {
        products: [
          {
            id: 1,
            name: "Kantong Sampah Anjing",
            description: "Kantong sampah yang praktis dan ramah lingkungan untuk memudahkan pembuangan kotoran hewan peliharaan anda.",
            price: 150000,
            image: "assets/product-1.jpg"
          },
          {
            id: 2,
            name: "Aksesoris Hewan Peliharaan",
            description: "Jelajahi berbagai aksesoris bergaya dan fungsional untuk teman berbulu lebat Anda.",
            price: 225000,
            image: "assets/product-2.jpg"
          },
          {
            id: 3,
            name: "Makanan Anjing",
            description: "Makanan anjing yang bergizi dan lezat untuk menjaga hewan peliharaan Anda tetap sehat dan bahagia.",
            price: 55000,
            image: "assets/product-3.jpg"
          }
        ],
        formatRupiah(value) {
          return value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
          });
        }
      };
    });
  
    console.log('produkToko diinisialisasi');
  

    Alpine.store("cart", {
      items: [],
      total: 0,
      qty: 0,
      isGatewayOpen: false,
      add(newItem) {
        const cartItem = this.items.find((item) => item.id === newItem.id);
        if (!cartItem) {
          this.items.push({ ...newItem, qty: 1, total: newItem.price });
          this.qty++;
          this.total += newItem.price;
        } else {
          this.items = this.items.map((item) => {
            if (item.id !== newItem.id) {
              return item;
            } else {
              item.qty++;
              item.total = item.price * item.qty;
              this.qty++;
              this.total += item.price;
              return item;
            }
          });
        }
        console.log('nambah');
      },
      remove(id) {
        const cartItem = this.items.find((item) => item.id === id);
  
        if (cartItem.qty > 1) {
          this.items = this.items.map((item) => {
            if (item.id !== id) {
              return item;
            } else {
              item.qty--;
              item.total = item.price * item.qty;
              this.qty--;
              this.total -= item.price;
              return item;
            }
          });
        } else if (cartItem.qty === 1) {
          this.items = this.items.filter((item) => item.id !== id);
          this.qty--;
          this.total -= cartItem.price;
        }
      },
      chekout() {
        const pesanan = this.items.map(
          (item) => `- ${item.name} x${item.qty}  Rp${item.price} `
        );
        const totalHarga = `Total: Rp${this.total}`;
        const url =
          "https://api.whatsapp.com/send?phone=6282228773372&text=Pesanan%20Anda%0A" +
          pesanan.join("\n") +
          "\n\n" +
          totalHarga +
          "*%0AAtas%20Nama%0A*Nama mu*";
        window.open(url);
      },
      formatRupiah(value) {
          return value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
          });
        }
    });
});
