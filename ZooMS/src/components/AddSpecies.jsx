import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddSpecies() {
  const [species, setSpecies] = useState({
    name: "",
    conservation_status: "",
    id_habitat: "",
  });

  const [habitat, setHabitat] = useState([]);
  const [confirmAddHabitat, setConfirmAddHabitat] = useState(false); // New state for confirmation
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/habitat")
      .then((result) => {
        if (result.data.Status) {
          setHabitat(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const handleHabitatChange = (e) => {
    const { name, value } = e.target;
    setSpecies((prevData) => ({
      ...prevData,
      habitat: {
        ...prevData.habitat,
        [name]: value,
      },
    }));
  };
  const handleConfirmAddHabitat = () => {
    // Get the selected habitat details from the dropdown
    const selectedHabitat = habitat.find((h) => h.id === species.id_habitat);
    
    if (selectedHabitat) {
      // Add habitat details to the species state
      setSpecies((prevData) => ({
        ...prevData,
        habitat: {
          name: selectedHabitat.name,
          temp: selectedHabitat.temp,
          humidity: selectedHabitat.humidity,
          depth: selectedHabitat.depth,
          id_site: selectedHabitat.id_site,
        },
      }));
    }
  
    setConfirmAddHabitat(true);
  };



const handleSubmit = (e) => {
  e.preventDefault();
  

  if (confirmAddHabitat) {
    // Handle axios post request for a new habitat
    axios
      .post("http://localhost:3000/auth/add_habitat", species.habitat)
      .then((habitatResult) => {
        if (habitatResult.data.Status) {
          // Update species with the newly created habitat ID
          setSpecies((prevData) => ({
            ...prevData,
            id_habitat: habitatResult.data.Result.id,
          }));
          // Continue with adding the species
          axios
            .post("http://localhost:3000/auth/add_species", species)
            .then((result) => {
              if (result.data.Status) {
                // Reset confirmation state and navigate
                setConfirmAddHabitat(false);
                navigate("/dashboard/species");
              } else {
                alert(result.data.Error);
              }
            })
            .catch((err) => console.log(err));
        } else {
          alert(habitatResult.data.Error);
        }
      })
      .catch((err) => console.log(err));
  } else {
    // Handle axios post request for an existing habitat
    axios
      .post("http://localhost:3000/auth/add_species", species)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/species");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }
};
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h2>Add Species</h2>
        <form onSubmit={handleSubmit}>
          {/* Species Section */}
          <div className="col-12">
                <label for="inputName" className="form-label"> Name </label>
                <input type="text" className="form-control rounded-0" id="inputName"
                placeholder="Enter species name"
                onChange={(e) =>
                    setSpecies({ ...species, name: e.target.value })
                }
                />
            </div>
            <div className="col-12">
                <label for="inputStatus" className="form-label"> Conservation Status </label>
                <input type="text" className="form-control rounded-0" id="inputStatus"
                placeholder="Enter status"
                onChange={(e) =>
                    setSpecies({ ...species, conservation_status: e.target.value })
                }
                />
            </div>
          <div className="col-12">
            <label htmlFor="inputHabitat" className="form-label">Habitat</label>

            <select
              name="habitat" id="inputHabitat" className="form-select"
              onChange={(e) => setSpecies({...species, id_habitat: e.target.value})}
            >
              <option value="">Select Habitat</option>
              {habitat.map((d) => {
                    return <option value={d.id}>{d.name}-temp:{d.temp}-Humidity:{d.humidity}-Depth:{d.depth}</option>;
                })}
              <option value="new">Other (New Habitat)</option>
            </select>
                
          </div>

          {/* Habitat Section */}
          {species.id_habitat === "new" && !confirmAddHabitat &&(
            <>
            <div className="col-12 mt-3">
              <label htmlFor="inputHabitatName" className="form-label">Habitat Name</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputHabitatName"
                name="name"
                placeholder="Enter habitat name"
                onChange={handleHabitatChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputTemp" className="form-label">Temperature</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputTemp"
                name="temp"
                placeholder="Enter temperature"
                onChange={handleHabitatChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputHumidity" className="form-label">Humidity</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputHumidity"
                name="humidity"
                placeholder="Enter humidity"
                onChange={handleHabitatChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputDepth" className="form-label">Depth</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputDepth"
                name="depth"
                placeholder="Enter depth"
                onChange={handleHabitatChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputSite" className="form-label">Site ID</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputSite"
                name="id_site"
                placeholder="Enter site ID"
                onChange={handleHabitatChange}
              />
            </div>
            </>
          )}
            {/* Confirm addHabitat button */}
            {species.id_habitat === "new" && !confirmAddHabitat && (
            <button
              type="button"
              className="btn btn-success w-100 rounded-0 mb-2"
              onClick={handleConfirmAddHabitat}
            >
              Confirm addHabitat
            </button>
          )}

          <button className='btn btn-primary w-100 rounded-0 mb-2'>Add Species</button>
        </form>
      </div>
    </div>
  );
}

export default AddSpecies;