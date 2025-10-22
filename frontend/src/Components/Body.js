import { useEffect, useState } from "react";
import Category from "./Category";
import Banner from "./Banner";
import { fetchCategories, fetchSubcategories } from "../services/api";
import SubcategoryGrid from "./SubcategoryGrid";
import React from "react";
import { useParams } from "react-router-dom";
import React from "react";

const Body = () => {
  const token = localStorage.getItem("token");
  const { category_slug } = useParams();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const cats = await fetchCategories(token);
      setCategories(cats || []);
      setLoading(false);
    };
    loadCategories();
  }, []);

    useEffect(() => {
    if (!category_slug || categories.length === 0) return;

    const matched = categories.find(cat => cat.category_slug === category_slug);
    if (matched) {
      setSelectedCategoryId(matched._id);
    } else {
      setSelectedCategoryId(null); // fallback if not found
    }
  }, [category_slug, categories]);

  // ✅ Load subcategories when category changes
  useEffect(() => {
    const loadSubcategories = async () => {
      if (!selectedCategoryId) return;
      setLoading(true);
      const subs = await fetchSubcategories(selectedCategoryId, token);
      setSubcategories(subs || []);
      setLoading(false);
    };
    loadSubcategories();
  }, [selectedCategoryId]);

  console.log("Subcategories:", subcategories);


  return (
    <div className="p-4">
      <Banner />

      {/* ✅ Category Selector */}
      <Category
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        loading={loading}
      />

      {loading && selectedCategoryId && (
        <div className="text-center text-gray-500 mt-4">Loading subcategories...</div>
      )}

      {/* ✅ Subcategory Grid */}
      <SubcategoryGrid subcategories={subcategories} />
      {/* ✅ Subcategory Grid */}

    </div>
  );
};

export default Body;
