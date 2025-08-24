import React, { useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchPublicRecipes } from "../hooks/useRecipes";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Receipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchPublicRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const handleExplore = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "info",
        title: "Please Login First",
        text: "You need to login to explore our recipes.",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  if (loading) {
    return (
      <section className="py-16 flex justify-center items-center">
        <Loader2 className="animate-spin w-6 h-7" />
        <p className="ml-2 text-gray-600">Loading dishes...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Popular Dishes
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most loved dishes, crafted with the finest ingredients
            and delivered with care.
          </p>
        </div>

        {/* Recipes Carousel */}
        <div className="relative">
          {/* Custom Prev Button */}
          <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-green-600 hover:text-white transition">
            ‹
          </button>

          {/* Custom Next Button */}
          <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-green-600 hover:text-white transition">
            ›
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {recipes.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* Image & Rating */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1 shadow">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {item.rating || "4.5"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg sm:text-xl font-bold text-black">
                        {item.name}
                      </h4>
                      <span className="text-sm font-bold text-green-600">
                        &#8377;{item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Actions */}
                    <button
                      onClick={handleExplore}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Explore More
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Receipes;
