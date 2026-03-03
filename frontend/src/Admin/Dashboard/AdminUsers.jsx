import React, { useEffect, useState } from "react";
import AdminSideBar from "../AdminComponents/AdminSideBar";
import AdminHeader from "../AdminComponents/AdminHeader";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [user, setUser] = useState([]);
  const [selectedRole, setSelectedRole] = useState("user");
  const [filterRole, setFilterRole] = useState("All Roles");

  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const roles = ["admin", "editor", "user"];

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user");
      setUser(res.data.users);
    } catch (error) {
      toast.error("Failed To Fetch Users");
    } 
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // UPDATE user
        const res = await api.put(
          `/user/${editingUser._id}`,
          formData
        );
        toast.success("User updated successfully");
      } else {
        //create user
        const res = await api.post(
          "/user/register",
          formData
        );
        toast.success("User Created Successfully");
      }
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });
       setSelectedRole("user")
      setEditingUser(null);
      setIsEditing(false);

      fetchUsers();
    } catch (error) {
      toast.error("Failed To Create User");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;
    try {
      await api.delete(`/user/${id}`);
      toast.success("User Deleted Successfully");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete User");
    }
  };

  const getInitialsColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-600";
      case "editor":
        return "bg-blue-100 text-blue-600";
      case "user":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700";
      case "editor":
        return "bg-blue-100 text-blue-700";
      case "user":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredUsers =
    filterRole === "All Roles"
      ? user
      : user.filter((u) => u.role === filterRole);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSideBar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <h2 className="text-lg font-semibold mb-4">
                {isEditing ? "Edit User" : "Add New User"}
              </h2>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full border-none bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full border-none bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full border-none bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full border-none bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer text-sm"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full border-none bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
                    {isEditing ? "Update User" : " Add User"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          password: "",
                          role: "user",
                        });
                        setSelectedRole("user");
                        setEditingUser(null);
                      }}
                      className="ml-2 bg-white border border-red-500 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow overflow-y-auto px-2 md:px-6">
              <div className="py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">
                  All Users
                </h2>
              </div>
              {/* filter user by role */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Role
                </label>
                <div className="relative">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full border-none bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer text-sm"
                  >
                    <option value="All Roles">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                  <i className="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>

              <div className="w-full max-w-full overflow-x-auto">
                <table className="min-w-full w-full table-auto ">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-2 font-medium text-gray-700">
                        User
                      </th>
                      <th className="text-left py-4 px-2 font-medium text-gray-700">
                        Email
                      </th>
                      <th className="text-left py-4 px-2 font-medium text-gray-700">
                        Role
                      </th>
                      <th className="text-left py-4 px-2 font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>

                    <tbody>
                      {filteredUsers.map((user, i) => (
                        <tr
                          key={user._id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${getInitialsColor(
                                  user.role
                                )}`}
                              >
                                {user.firstName.slice(0, 2).toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-900">
                                {user.firstName}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-gray-600">
                            {user.email}
                          </td>
                          <td className="py-4 px-2">
                            <span
                              className={`px-3 py-1 rounded-full text-[15px] capitalize font-medium ${getRoleBadgeColor(
                                user.role
                              )}`}
                            >
                              {user.role}
                            </span>
                          </td>

                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => {
                                  setEditingUser(user);
                                  setFormData({
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    password: "",
                                    role: user.role,
                                  });
                                  setSelectedRole(user.role);
                                  setIsEditing(true);
                                }}
                                className="text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
                              >
                                <FaEdit className="" />
                              </button>

                              <button
                                onClick={() => handleDelete(user._id)}
                                disabled={user.role === "admin"}
                                className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                              >
                                <FaTrash className="" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
