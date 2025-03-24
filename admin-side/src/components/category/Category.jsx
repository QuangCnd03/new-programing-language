import React from "react";

export const ShowCategoryLevel = ({ categories, parentId = 0, level = "", handleDeleteCategory }) => {
  return categories
    .filter((category) => category.parent_id === parentId)
    .map((category) => (
      <React.Fragment key={category.id}>
        <tr>
          <td className="text-left">
            {level}
            {category.name}
          </td>
          <td>
            <a href="#" className="btn btn-primary btn-sm">
              View
            </a>
          </td>
          <td>{new Date(category.created_at).toLocaleDateString()}</td>
          <td>
            <a href={`/admin/categories/edit/${category.id}`}>
              <i className="fa fa-edit"></i>
            </a>
          </td>
          <td>
            <a href="#" id="category-remove" data-value={category.id}
              onClick={() => handleDeleteCategory(category.id)}>
              <i className="fa fa-trash"></i>
            </a>
          </td>
        </tr>
        <ShowCategoryLevel categories={categories} parentId={category.id} level={level + "→ | "}
          handleDeleteCategory={handleDeleteCategory}/>
      </React.Fragment>
    ));
};
export const ShowCategoryOptionLevel = ({ categories, parentId = 0, level = "" }) => {
  if (!Array.isArray(categories)) {
    return null;
  }
  return categories
    .filter((category) => category.parent_id === parentId)
    .map((category) => (
      <React.Fragment key={category.id}>
        <option value={category.id}>
          {level}
          {category.name}
        </option>
        <ShowCategoryOptionLevel categories={categories} 
          parentId={category.id} level={level + "|- "} 
        />
      </React.Fragment>
    ));
};