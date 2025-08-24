import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "", // now we just store the link
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-xl shadow-md">
        <p className="text-red-600 font-semibold">
          Access Denied – Only Admins Can Add Recipes
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please provide an image link");
      return;
    }

    try {
      const res = await axiosInstance.post("/recipes", formData);

      toast.success(res.data.message);

      // Reset form
      setFormData({ name: "", description: "", price: "", image: "" });

      // ✅ Redirect to dashboard after success
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="url"
          name="image"
          placeholder="Image Link (https://...)"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
