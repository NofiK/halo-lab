export type FormDataDto = {
  name: string;
  birthdayDate: string;
  sex: string;
  cityId: string;
  doctorSpecialityId: string;
  email: string;
  mobileNumber: string;
};

export type CityDto = {
  id: string;
  name: string;
};
export type GenderDto = "Male" | "Female";

export type DoctorSpecialityDto = {
  id: string;
  name: string;
  params?: {
    gender: GenderDto;
  };
};

export type DoctorDto = {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
};
