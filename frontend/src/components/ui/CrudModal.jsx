// src/components/CrudModal.jsx
import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import Button from "./Button";

export default function CrudModal({
  isOpen,
  onClose,
  title = "Form",
  fields = [], // Array konfigurasi field
  initialData = {}, // Data untuk edit (kosong = create)
  onSubmit,
  mode = "create", // create | edit | view
}) {
  {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    // Reset form saat modal dibuka
    useEffect(() => {
      if (isOpen) {
        const defaults = {};
        fields.forEach((f) => {
          defaults[f.name] = initialData[f.name] || f.default || "";
        });
        setFormData(defaults);
      }
    }, [isOpen, initialData, fields]);

    const handleChange = (e) => {
      const { name, value, type, checked, files, multiple } = e.target;
      setFormData((prev) => {
        if (type === "file" && multiple) {
          const oldFiles = Array.isArray(prev[name]) ? prev[name] : [];
          const newFiles = Array.from(files);
          const mergedFiles = [...oldFiles, ...newFiles].filter(
            (file, idx, arr) =>
              arr.findIndex(
                (f) => f.name === file.name && f.size === file.size,
              ) === idx,
          );
          return {
            ...prev,
            [name]: mergedFiles,
          };
        }
        return {
          ...prev,
          [name]:
            type === "checkbox" ? checked : type === "file" ? files[0] : value,
        };
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      await onSubmit?.(formData, mode);
      setLoading(false);
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              {mode === "create" && "Tambah "}
              {mode === "edit" && "Edit "}
              {mode === "view" && "Detail "}
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <FormInput
                  {...field}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  disabled={mode === "view" || field.disabled}
                  className={mode === "view" ? "bg-gray-100" : ""}
                />
                {/* Preview untuk field images */}
                {field.type === "file" &&
                  field.multiple &&
                  formData[field.name] &&
                  Array.isArray(formData[field.name]) &&
                  formData[field.name].length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {formData[field.name].map((file, idx) => {
                        const url =
                          typeof file === "string"
                            ? file
                            : URL.createObjectURL(file);
                        return (
                          <img
                            key={idx}
                            src={url}
                            alt={file.name || `Image ${idx + 1}`}
                            className="h-16 w-16 object-cover rounded border"
                          />
                        );
                      })}
                    </div>
                  )}
              </div>
            ))}

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              {mode !== "view" && (
                <Button type="submit" disabled={loading}>
                  {loading
                    ? "Menyimpan..."
                    : mode === "create"
                      ? "Simpan"
                      : "Update"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
