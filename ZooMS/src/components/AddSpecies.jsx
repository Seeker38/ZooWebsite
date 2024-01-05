import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function AddSpecies() {
  const [species, setSpecies] = useState({
    name:"",
    conservation_status: "",
    id_habitat: "",
});


const [habitat, setHabitat] = useState([]);    
const navigate = useNavigate()

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

const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3000/auth/add_species', species)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/species')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
}
return (
<div className="d-flex justify-content-center align-items-center mt-3">
  <div className="p-3 rounded w-50 border">
        <h2>Add Species</h2>
        <form onSubmit={handleSubmit}>
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
                <label for="inputHabitat" className="form-label">
                Habitat
                </label>
                <select name="animal" id="inputHabitat" className="form-select"
                    onChange={(e) => setSpecies({...species, id_habitat: e.target.value})}>
                {habitat.map((d) => {
                    return <option value={d.id}>{d.name}</option>;
                })}
                </select>
            </div>
            <button className='btn btn-primary w-100 rounded-0 mb-2'>Add Species</button>
        </form>
    </div>
</div>
)
}


export default AddSpecies