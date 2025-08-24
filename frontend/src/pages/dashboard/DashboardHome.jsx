import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRecipes } from "../../hooks/useRecipes";
import { useCartActions } from "../../hooks/useCartActions";
import { usePagination } from "../../hooks/usePagination";
import RecipeCard from "../dashboard/receipe-card/RecipeCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axios";

export default function DashboardHome() {
  const { data: recipes, isLoading: recipesLoading, refetch } = useRecipes();
  const { user } = useAuth();
  const { loadingId, handleAddToCart, recipesWithCartStatus } = useCartActions();

  const recipesData = recipesWithCartStatus(recipes) || [];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute itemsPerPage dynamically
  let itemsPerPage = 6; // default
  if (windowWidth >= 1280) itemsPerPage = 8;
  else if (windowWidth >= 1024) itemsPerPage = 6;
  else if (windowWidth >= 640) itemsPerPage = 4;
  else itemsPerPage = 2;

  const {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
    prevPage,
    nextPage,
    setPageSize,
  } = usePagination(recipesData, itemsPerPage);

  // Update hook's pageSize whenever itemsPerPage changes
  useEffect(() => {
    setPageSize(itemsPerPage);
    setCurrentPage(1);
  }, [itemsPerPage]);

  if (recipesLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-10 w-10 text-green-600" />
      </div>
    );

  // Handle edit
  const handleEdit = (recipe) => {
    navigate(`/dashboard/admin/edit-recipe/${recipe._id}`);
  };

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the recipe!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/recipes/${id}`);
          Swal.fire("Deleted!", "Recipe has been removed.", "success");
          await refetch(); // refresh
        } catch (err) {
          Swal.fire("Error!", err.response?.data?.message || "Something went wrong", "error");
        }
      }
    });
  };

  return (
    <div className="px-8">
      <h1 className="text-2xl font-semibold mb-6">
        Welcome {user?.name}, explore our latest recipes!
      </h1>

      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {currentItems.map((item) => (
          <RecipeCard
            key={item._id}
            item={item}
            inCart={item.inCart}
            loadingId={loadingId}
            onAddToCart={handleAddToCart}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            ‹
          </button>

          <span className="px-3 py-1 rounded-lg text-xs border bg-green-100 text-green-500">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
