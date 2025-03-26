import React from 'react';

export const ShowCategoryCheckbox = ({ categories, parentId = 0, level = "", handleCategoryChange, selectedIds = [] }) => {
    return categories
        .filter((category) => category.parent_id === parentId)
        .map((category) => (
            <React.Fragment key={category.id}>
                <p>
                    <input
                        type="checkbox"
                        name="categories[]"
                        value={category.id}
                        onChange={handleCategoryChange}
                        checked={selectedIds.includes(category.id.toString())}
                    />
                    {level}
                    {category.name}
                </p>
                <ShowCategoryCheckbox
                    categories={categories}
                    parentId={category.id}
                    level={level + "→ | "}
                    handleCategoryChange={handleCategoryChange}
                    selectedIds={selectedIds}
                />
            </React.Fragment>
        ));
};