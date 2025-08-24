import AddRecipeForm from "./AddRecipeForm";


export default function AddRecipePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Recipe (Admin Only)</h1>
      <AddRecipeForm/>
    </div>
  );
}
