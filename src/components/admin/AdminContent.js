// src/components/admin/AdminContent.js
"use client";

import MenuSectionForm from '@/components/admin/MenuSectionForm';

export default function AdminContent({ 
    activeSection, 
    menuData, 
    handleAddItem, 
    setMenuData 
}) {
    return (
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            {activeSection && menuData && (
                <MenuSectionForm
                    sectionData={menuData[activeSection]}
                    sectionName={activeSection}
                    handleAddItem={handleAddItem}
                    setMenuData={setMenuData}
                    menuData={menuData}
                />
            )}
        </div>
    );
}
