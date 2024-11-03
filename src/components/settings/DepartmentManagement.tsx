import React, { useState } from 'react';
import { Building, Plus, X, Edit2, Save } from 'lucide-react';
import { useRoles } from '../../contexts/RoleContext';

const DepartmentManagement = () => {
  const { departments, setDepartments } = useRoles();
  const [editingDept, setEditingDept] = useState<string | null>(null);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({});

  const handleSaveDepartment = (department: Department) => {
    setDepartments(prev => prev.map(d => d.id === department.id ? department : d));
    setEditingDept(null);
  };

  const handleAddDepartment = () => {
    if (newDepartment.name) {
      const department: Department = {
        id: Date.now().toString(),
        name: newDepartment.name,
        description: newDepartment.description || '',
      };
      setDepartments(prev => [...prev, department]);
      setNewDepartment({});
    }
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Department Management</h2>
      </div>

      <div className="space-y-4">
        {/* Add New Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Department Name"
            value={newDepartment.name || ''}
            onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
            className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Description"
            value={newDepartment.description || ''}
            onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
            className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleAddDepartment}
            className="md:col-span-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Department
          </button>
        </div>

        {/* Department List */}
        <div className="space-y-4">
          {departments.map(department => (
            <div
              key={department.id}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              {editingDept === department.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={department.name}
                    onChange={(e) => handleSaveDepartment({ ...department, name: e.target.value })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    value={department.description}
                    onChange={(e) => handleSaveDepartment({ ...department, description: e.target.value })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => setEditingDept(null)}
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{department.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{department.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingDept(department.id)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDepartment(department.id)}
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;