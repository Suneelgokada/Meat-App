import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Pencil, Check, X} from "lucide-react";

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const [profile, setProfile] = useState({
    name: "NEWUSER",
    email: "",
    phone: "0000000000",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingField, setEditingField] = useState(null);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  // ======================== FETCH PROFILE ========================
  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("http://localhost:4000/api/userprofile/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setProfile({
          name: data.profile?.name || "NEWUSER",
          email: data.profile?.email || "",
          phone: data.profile?.userId?.phone || "0000000000",
        });
        setTempName(data.profile?.name || "");
        setTempEmail(data.profile?.email || "");
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [isLoggedIn]);

  // ======================== UPDATE PROFILE ========================
  const updateProfile = async (updatedFields) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:4000/api/userprofile/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setProfile({
        name: data.profile?.name,
        email: data.profile?.email,
        phone: data.profile?.userId?.phone || profile.phone,
      });
      setEditingField(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSave = (field) => {
    if (field === "name" && !tempName.trim()) return alert("Name cannot be empty");
    if (field === "email" && !tempEmail.trim()) return alert("Email cannot be empty");

    updateProfile({
      name: field === "name" ? tempName : tempName || profile.name,
      email: field === "email" ? tempEmail : tempEmail || profile.email,
    });
  };

  const handleCancel = (field) => {
    if (field === "name") setTempName(profile.name);
    if (field === "email") setTempEmail(profile.email);
    setEditingField(null);
  };

  // ======================== UI ========================
  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center">
      {/* Avatar Section */}
      <div className="relative w-full bg-[#ffe0e4] text-white pt-16 pb-28 rounded-b-[100px]">
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 w-24 h-24 rounded-full bg-white border-4 border-red-500 flex items-center justify-center text-red-500 text-3xl font-bold shadow-lg">
          {profile.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="mt-16 text-xl font-bold uppercase text-black text-center">
        {profile.name}
      </div>

      <div className="w-full mt-8 space-y-6 px-4">
        {/* Name */}
        <div className="border-b py-2">
          <div className="text-xs font-semibold text-gray-500 uppercase">Name</div>
          <div className="flex justify-between items-center mt-1">
            {editingField === "name" ? (
              <>
                <input
                  type="name"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="flex-1 border-none outline-none bg-transparent border-b border-gray-400 focus:border-pink-500"
                  autoFocus
                />
                <div className="flex items-center gap-2 ml-2">
                  <button onClick={() => handleSave("email")}>
                    <Check size={18} className="text-green-600" />
                  </button>
                  <button onClick={() => handleCancel("email")}>
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="flex-1">
                  {profile.name || "Your email address"}
                </span>
                <button onClick={() => setEditingField("name")}>
                  <Pencil size={18} className="text-gray-500 hover:text-pink-500" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="border-b py-2">
          <div className="text-xs font-semibold text-gray-500 uppercase">Email</div>
          <div className="flex justify-between items-center mt-1">
            {editingField === "email" ? (
              <>
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="flex-1 border-none outline-none bg-transparent border-b border-gray-400 focus:border-pink-500"
                  autoFocus
                />
                <div className="flex items-center gap-2 ml-2">
                  <button onClick={() => handleSave("email")}>
                    <Check size={18} className="text-green-600" />
                  </button>
                  <button onClick={() => handleCancel("email")}>
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="flex-1">
                  {profile.email || "Your email address"}
                </span>
                <button onClick={() => setEditingField("email")}>
                  <Pencil size={18} className="text-gray-500 hover:text-pink-500" />
                </button>
              </>
            )}
          </div>
        </div>

         

        {/* Phone */}
        <div className="border-b py-2">
          <div className="text-xs font-semibold text-gray-500 uppercase">Mobile Number</div>
          <div className="mt-1">{profile.phone}</div>
        </div>

        {loading && <div className="text-center text-gray-500 mt-2">Loading...</div>}
        {error && <div className="text-center text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default Profile;
