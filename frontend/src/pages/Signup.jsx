import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  
  // Define input fields using custom useField hook
  const name = useField("text");
  const userName = useField("text");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const membershipStatus = useField("text");
  const bio = useField("text");
  const street = useField("text");
  const city = useField("text");
  const state = useField("text");
  const zipCode = useField("text");
  const profilePicture = useField("text");

  const { signup, error, isLoading } = useSignup("http://localhost:4000/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = {
      name: name.value,
      username: userName.value, // ✅ Matches backend schema
      password: password.value,
      phone_number: phoneNumber.value,
      profilePicture: profilePicture.value, // ✅ Matches schema
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      role: membershipStatus.value.toLowerCase(), // ✅ Convert role to lowercase
      address: {
        street: street.value, 
        city: city.value,
        state: state.value,
        zipCode: zipCode.value
      }
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
        
        <label>Username:</label>
        <input {...userName} required />
        
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
        
        <label>Membership Status (Role):</label>
        <select {...membershipStatus} required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>

        <label>Bio:</label>
        <textarea {...bio} placeholder="Tell us about yourself..." />

        <label>Street:</label>
        <input {...street} required />

        <label>City:</label>
        <input {...city} required />

        <label>State:</label>
        <input {...state} required />

        <label>ZIP Code:</label>
        <input {...zipCode} required />

        <label>Profile Picture URL:</label>
        <input {...profilePicture} placeholder="Paste profile picture URL" />

        <button disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
