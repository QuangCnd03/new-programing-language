import React from "react";

export const ShowCategoryCheckbox = ({ categories, parentId = 0, level = "", handleCategoryChange}) => {
    return categories
        .filter((category) => category.parent_id === parentId)
        .map((category) => (
            <React.Fragment key={category.id}>
                <p>
                    <input type="checkbox" name="categories[]" value={category.id} onChange={handleCategoryChange} />
                    {level}
                    {category.name}
                </p>
                <ShowCategoryCheckbox 
                    categories={categories} 
                    parentId={category.id} 
                    level={level + "→ | "} 
                    handleCategoryChange={handleCategoryChange} 
                />
            </React.Fragment>
        ));
}