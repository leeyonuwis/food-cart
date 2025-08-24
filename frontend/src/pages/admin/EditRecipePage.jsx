import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/axios";

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    rating: "",
  });

  // Load existing recipe
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axiosInstance.get(`/recipes/${id}`);
        setForm(data);
      } catch (err) {
        toast.error("Could not load recipe");
      }
    };
    fetchRecipe();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/recipes/${id}`, form);
      toast.success("Recipe updated successfully ✅");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Recipe Name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full border p-2 rounded"
          step="0.1"
          max="5"
          min="1"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
}
