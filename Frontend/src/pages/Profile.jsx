import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEdit(false);
    alert("Profile updated successfully 🚀");
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        Please login first
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 pt-28">


      {/* HEADER */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
          alt="profile"
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h1 className="text-3xl font-bold">{user.name} 👋</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white text-black rounded-2xl p-8 shadow-lg">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profile Details</h2>

          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={saveProfile}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* BASIC */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-600">
              BASIC INFORMATION
            </h3>

            <p className="text-gray-500 text-sm">Full Name</p>
            {edit ? (
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="border p-2 w-full mb-4"
              />
            ) : (
              <p className="mb-4">{user.name}</p>
            )}

            <p className="text-gray-500 text-sm">Email</p>
            <p>{user.email}</p>
          </div>

          {/* CAREER */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-600">
              CAREER DETAILS
            </h3>

            <p className="text-gray-500 text-sm">Role</p>
            {edit ? (
              <input
                name="role"
                value={user.role || ""}
                onChange={handleChange}
                placeholder="Student / Developer"
                className="border p-2 w-full mb-4"
              />
            ) : (
              <p className="mb-4">{user.role || "Student"}</p>
            )}

            <p className="text-gray-500 text-sm">Goal</p>
            {edit ? (
              <input
                name="goal"
                value={user.goal || ""}
                onChange={handleChange}
                placeholder="Dream company"
                className="border p-2 w-full"
              />
            ) : (
              <p>{user.goal || "Get placement in tech"}</p>
            )}
          </div>

          {/* SKILLS */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-600">
              SKILLS
            </h3>

            <p className="text-gray-500 text-sm">Skills</p>
            {edit ? (
              <input
                name="skills"
                value={user.skills || ""}
                onChange={handleChange}
                placeholder="React, Python, SQL"
                className="border p-2 w-full mb-4"
              />
            ) : (
              <p className="mb-4">{user.skills || "Add your skills"}</p>
            )}

            <p className="text-gray-500 text-sm">Member Since</p>
            <p>2026</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
