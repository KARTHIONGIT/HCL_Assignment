import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'sonner';
import "./styles/AddUser.css";

const AddUser = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");

    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const validate = () => {
        let temp = {};

        if (!name.trim()) temp.name = "Name is required";
        else if (name.length < 2 || name.length > 100) temp.name = "Name should be 2 - 100 characters only"

        if (!age) temp.age = "Age is required";
        else if (age <= 0 || age > 120) temp.age = "Age must be 0 - 120";

        if (!city.trim()) temp.city = "City is required";

        if (!pincode) temp.pincode = "Pincode is required";
        else if (!/^\d{4,10}$/.test(pincode)) {
            temp.pincode = "Pincode must be between 4 and 10 number range";
        }
        if (!state.trim()) temp.state = "State is required";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const user = { name, age, city, pincode, state };
        console.log("Submitted:", user);

        fetch("https://localhost:44350/addUsers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        toast.success('Action successful!');
        setName("");
        setAge("");
        setCity("");
        setPincode("");
        setState("");
        setErrors({});
        navigate(`/?success=true&name=${name}`);
    };

    return (
        <div className="form-container">
            
            <form className="user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? "input error" : "input"}
                    />
                    <small className="error-text">{errors.name}</small>
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className={errors.age ? "input error" : "input"}
                    />
                    <small className="error-text">{errors.age}</small>
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={errors.city ? "input error" : "input"}
                    />
                    <small className="error-text">{errors.city}</small>
                </div>

                <div className="form-group">
                    <label>Pincode</label>
                    <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className={errors.pincode ? "input error" : "input"}
                    />
                    <small className="error-text">{errors.pincode}</small>
                </div>

                <div className="form-group">
                    <label>State</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className={errors.state ? "input error" : "input"}
                    />
                    <small className="error-text">{errors.state}</small>
                </div>

                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUser;
