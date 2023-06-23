import React, { useEffect, useState } from "react";
import FormToPrefill from "./components/FormToPrefill/FormToPrefill";
import "./FindDoctor.scss";
import { CityDto, DoctorSpecialityDto, FormDataDto } from "./types/types";
import DoctorsList from "./components/DoctorsList/DoctorsList";

const FindDoctor = () => {
  const [formData, setFormData] = useState<FormDataDto | null>(null);
  const [citiesList, setCitiesList] = useState<CityDto[]>([]);
  const [doctorsSpeciality, setDoctorsSpeciality] = useState<
    DoctorSpecialityDto[]
  >([]);
  
  const getCityListData = async () => {
    const response: CityDto[] = await fetch(
      "https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4"
    ).then((response) => response.json());

    setCitiesList(response);
  };
  const getDoctorsSpeciality = async () => {
    const response = await fetch(
      "https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca"
    ).then((response) => response.json());

    setDoctorsSpeciality(response);
  };

  useEffect(() => {
    getCityListData();
    getDoctorsSpeciality();
  }, []);

  return (
    <div className="FindDoctor">
      <FormToPrefill
        doctorsSpeciality={doctorsSpeciality}
        citiesList={citiesList}
        setFormData={setFormData}
      />
      {formData && (
        <DoctorsList
          doctorsSpeciality={doctorsSpeciality}
          formData={formData}
        />
      )}
    </div>
  );
};

export default FindDoctor;
