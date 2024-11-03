import React, { useState } from 'react';
import { Users, Plus, X, Edit2, Save } from 'lucide-react';
import { useRoles } from '../../contexts/RoleContext';

interface CustomRole {
  id: string;
  name: string;
  permissions: string[];
  level: number;
}

const RoleManagement = () => {
  const { roles, setRoles } = useRoles();
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<Partial<CustomRole>>({});

  const handleSaveRole = (role: CustomRole) => {
    setRoles(prev => prev.map(r => r.id === role.id ? role : r));
    setEditingRole(null);
  };

  const handleAddRole = () => {
    if (newRole.name) {
      const role: CustomRole = {
        id: Date.now().toString(),
        name: newRole.name.toUpperCase(),
        permissions: newRole.permissions || [],
        level: roles.length + 1
      };
      setRoles(prev => [...prev, role]);
      setNewRole({});
    }
  };

  const handleDeleteRole = (id: string) => {
    if (roles.length <= 3) {
      alert('Cannot delete default roles');
      return;
    }
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Role Management</h2>
      </div>

      <div className="space-y-4">
        {/* Add New Role */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="New Role Name"
            value={newRole.name || ''}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleAddRole}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </button>
        </div>

        {/* Role List */}
        <div className="space-y-4">
          {roles.map(role => (
            <div
              key={role.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              {editingRole === role.id ? (
                <div className="flex-1 flex items-center space-x-4">
                  <input
                    type="text"
                    value={role.name}
                    onChange={(e) => handleSaveRole({ ...role, name: e.target.value.toUpperCase() })}
                    className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => setEditingRole(null)}
                    className="p-2 text-indigo-600 hover:text-indigo-700"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900 dark:text-white">{role.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Level: {role.level}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingRole(role.id)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {role.level > 3 && (
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;