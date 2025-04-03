import tailwindcss from "@tailwindcss/vite";

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Adjust paths as needed
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Sanslem", "sans-serif"], // เพิ่มฟอนต์ที่ใช้งาน
      },
    },
  },
  plugins: [tailwindcss()],
};