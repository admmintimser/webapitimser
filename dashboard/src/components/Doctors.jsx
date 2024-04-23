import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1>Sucursales</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card">
               
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Correo: <span>{element.email}</span>
                  </p>
                  <p>
                    Telefono: <span>{element.phone}</span>
                  </p>
                  <p>
                    Fecha de alta: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Cliente: <span>{element.doctorDepartment}</span>
                  </p>
                  {/* <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p> */}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
