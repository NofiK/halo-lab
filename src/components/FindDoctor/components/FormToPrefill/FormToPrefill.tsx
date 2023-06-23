import React from "react";
import "./FormToPrefill.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormDataDto } from "../../types/types";
import { CityDto, DoctorSpecialityDto } from "../../types/types";

type FormToPrefillProps = {
  setFormData: (data: FormDataDto) => void;
  citiesList: CityDto[];
  doctorsSpeciality: DoctorSpecialityDto[];
};

const FormToPrefill: React.FC<FormToPrefillProps> = ({
  setFormData,
  citiesList,
  doctorsSpeciality,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormDataDto>({
    defaultValues: {
      sex: "Male",
      cityId: "1",
    },
  });

  const onFormSubmit: SubmitHandler<FormDataDto> = (data) => {
    setFormData(data);
  };

  const isDateValid = (date: string) => {
    const parsedDate = new Date(date);
    const isValidDate = !isNaN(+parsedDate) && parsedDate <= new Date();
    return isValidDate;
  };

  const formatBirthdayDate = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const inputValue = input.value;

    const numericValue = inputValue.replace(/\D/g, "");

    let formattedDate = "";
    if (numericValue.length > 0) {
      formattedDate = numericValue.slice(0, 2) + "/";
    }
    if (numericValue.length > 2) {
      formattedDate += numericValue.slice(2, 4) + "/";
    }
    if (numericValue.length > 4) {
      formattedDate += numericValue.slice(4, 8);
    }
    input.value = formattedDate;
  };

  return (
    <div className="FindDoctorForm">
      <div className="PrescriptionHandler"></div>
      <div className="PaperList">
        <img
          className="RedCrossImage"
          alt="redCross"
          src="/assets/red-cross.png"
        />
        <form className="Form" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="InputBox">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              {...register("name", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.name && (
              <p className="ErrorMessage">
                <img className="ErrorIcon" alt="error" src="assets/error.png" />
                Invalid name (name must not contain numbers)
              </p>
            )}
          </div>

          <div className="InputBox">
            <label htmlFor="birthdayDate">Birthday Date</label>
            <input
              id="birthdayDate"
              {...register("birthdayDate", {
                required: true,
                minLength: 10,
                validate: (value) => isDateValid(value),
              })}
              onInput={formatBirthdayDate}
            />
            {errors.birthdayDate && (
              <p className="ErrorMessage">
                <img className="ErrorIcon" alt="error" src="assets/error.png" />
                Invalid date format
              </p>
            )}
          </div>

          <div className="InputBox">
            <label htmlFor="sex">Sex</label>
            <select id="sex" {...register("sex", { required: true })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.sex && (
              <p className="ErrorMessage">
                <img className="ErrorIcon" alt="error" src="assets/error.png" />
                Please make a choice
              </p>
            )}
          </div>

          <div className="InputBox">
            <label htmlFor="city">City</label>
            <select id="city" {...register("cityId", { required: true })}>
              {citiesList?.length &&
                citiesList.map((city: CityDto) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
            </select>
            {errors.cityId && (
              <p className="ErrorMessage">
                <img className="ErrorIcon" alt="error" src="assets/error.png" />
                Please make a choice
              </p>
            )}
          </div>

          <div className="InputBox">
            <label htmlFor="doctorSpeciality">Doctor Speciality</label>
            <select
              id="doctorSpeciality"
              {...register("doctorSpecialityId", { required: false })}
            >
              <option value={0}>Any speciality</option>
              {doctorsSpeciality?.length &&
                doctorsSpeciality.map((doctor: DoctorSpecialityDto) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="InputBox">
            <div className="EmailAndMobileBox">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  {...register("email", {
                    required: !watch("mobileNumber"),
                    pattern:
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <p className="Error">
                    <img
                      className="ErrorIcon"
                      alt="error"
                      src="assets/error.png"
                    />
                    Invalid email address
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="mobileNumber">Mobile number</label>
                <input
                  id="mobileNumber"
                  {...register("mobileNumber", {
                    required: !watch("email"),
                    pattern: /^\d{10}$/i,
                  })}
                />
                {errors.mobileNumber && (
                  <p className="Error">
                    <img
                      className="ErrorIcon"
                      alt="error"
                      src="assets/error.png"
                    />
                    Invalid mobile number
                  </p>
                )}
              </div>
            </div>
            {!watch("email") && !watch("mobileNumber") && (
              <div className="ValidationBanner">
                <img
                  className="WarningIcon"
                  alt="warning"
                  src="/assets/warning.png"
                />
                <p>
                  At least one field (email or mobile number) should be provided
                </p>
              </div>
            )}
          </div>
          <button className="SubmitButton" type="submit">
            Find a doctor
          </button>
        </form>
      </div>
      <img className="PencilIcon" src="/assets/pencil.png" alt="pencil" />
    </div>
  );
};

export default FormToPrefill;
