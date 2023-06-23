import React, { useEffect, useState } from "react";
import { DoctorDto, DoctorSpecialityDto, FormDataDto } from "../../types/types";
import "./DoctorsList.scss";
type DoctorsListProps = {
  doctorsSpeciality: DoctorSpecialityDto[];
  formData: FormDataDto;
};

const DoctorsList: React.FC<DoctorsListProps> = ({
  doctorsSpeciality,
  formData,
}) => {
  const [doctors, setDoctors] = useState<DoctorDto[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorDto[]>([]);

  const getDoctorsData = async () => {
    const response: DoctorDto[] = await fetch(
      "https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21"
    ).then((response) => response.json());

    setDoctors(response);
  };
  const findDoctorSpeciality = (specialityId: string) =>
    doctorsSpeciality.find((speciality) => speciality.id === specialityId);

  const getCurrentAge = (birthdayDate: string) => {
    const today = new Date();
    const birthday = new Date(birthdayDate);
    return today.getFullYear() - birthday.getFullYear();
  };

  const filterDoctorsList = () => {
    const filteredDoctors = doctors.filter((doctor) => {
      const { doctorSpecialityId, sex, cityId } = formData;

      const doctorSpeciality = findDoctorSpeciality(doctorSpecialityId);
      const age = getCurrentAge(formData.birthdayDate);

      const isNeededSpeciality =
        doctorSpecialityId !== "0"
          ? doctor.specialityId === doctorSpecialityId
          : true;
      const isNeededCity = cityId === doctor.cityId;
      const isNeededSex = doctorSpeciality?.params?.gender
        ? doctorSpeciality.params.gender === sex
        : true;
      const isNeededDoctor =
        age < 18 ? doctor.isPediatrician : !doctor.isPediatrician;
      return (
        isNeededSpeciality && isNeededCity && isNeededSex && isNeededDoctor
      );
    });
    setFilteredDoctors(filteredDoctors);
  };

  useEffect(() => {
    filterDoctorsList();
  }, [formData, doctors]);

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <div className="DoctorsList">
      {filteredDoctors.length ? (
        filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="DoctorCard">
            <img src="/assets/doctor.png" alt="" />
            <div>
              <p className="DocotorName">
                {doctor.name + " " + doctor.surname}
              </p>
              <p className="DocotorDescription">
                {findDoctorSpeciality(doctor.specialityId)?.name},{" "}
                {doctor.isPediatrician ? "pediatrician" : "generalist"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="NotFoundMessage">
          We could not find a suitable doctor for you <br /> :(
        </p>
      )}
    </div>
  );
};

export default DoctorsList;
