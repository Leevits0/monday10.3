import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  
  // Define input fields using custom useField hook
  const name = useField("text");
  const email = useField("email");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const membershipStatus = useField("text");
  const bio = useField("text");
  const address = useField("text");
  const profilePicture = useField("text");

  const { signup, error, loading } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      membership_status: membershipStatus.value,
      bio: bio.value,
      address: address.value,
      profile_picture: profilePicture.value,
    };

    const success = await signup(newUser);

    if (success) {
      console.log("Signup successful!");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} required />
        
        <label>Email Address:</label>
        <input {...email} required />
        
        <label>Password:</label>
        <input {...password} required />
        
        <label>Phone Number:</label>
        <input {...phoneNumber} required />
        
        <label>Gender:</label>
        <select {...gender} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth:</label>
        <input {...dateOfBirth} required />
        
        <label>Membership Status:</label>
        <input {...membershipStatus} required />

        <label>Bio:</label>
        <textarea {...bio} placeholder="Tell us about yourself..." />

        <label>Address:</label>
        <input {...address} placeholder="Enter your address" required />

        <label>Profile Picture URL:</label>
        <input {...profilePicture} placeholder="Paste profile picture URL" />

        <button disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;