import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        privacyConsent: false,
        informedConsent: false,
        fastingHours: 0,
        lastMealTime: "",
        lastMealType: "",
        patientFirstName: "",
        patientLastName: "",
        patientMotherLastName: "",
        birthDate: "",
        areaType: "",
        educationLevel: "",
        sampleLocation: "",
        email: "",
        confirmEmail: "",
        mobilePhone: "",
        weightKg: 0,
        heightM: 0,
        vphVaccination: "",
        detectedConditions: "",
        tobaccoConsumption: "",
        cigarettesPerWeekBefore: "",
        cigarettesPerWeekAfter: "",
        papSmearTestStatus: "",
        papSmearTestYear: "",
        papSmearTestResult: "",
        colposcopyStatus: "",
        colposcopyYear: "",
        colposcopyResult: "",
        hysterectomyStatus: "",
        hysterectomyReason: "",
        lastMenstruationDate: "",
        firstMenstruationAge: "",
        sexualActivityStatus: "",
        firstSexualActivityAge: "",
        sexualPartnerCount: "",
        contraceptiveMethod: "",
        contraceptiveDuration: "",
        pregnancyStatus: "",
        childbirthCount: "",
        cesareanCount: "",
        abortionStatus: "",
        abortionCount: "",
    });

    // Fetching doctors
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/user/doctors",
                { withCredentials: true }
            );
            setDoctors(data.doctors);
            console.log(data.doctors);
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAppointment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/appointment/post",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            toast.success(data.message);

            // Reset form fields
            setFormData({
                privacyConsent: false,
                informedConsent: false,
                fastingHours: 0,
                lastMealTime: "",
                lastMealType: "",
                patientFirstName: "",
                patientLastName: "",
                patientMotherLastName: "",
                birthDate: "",
                areaType: "",
                educationLevel: "",
                sampleLocation: "",
                email: "",
                confirmEmail: "",
                mobilePhone: "",
                weightKg: 0,
                heightM: 0,
                vphVaccination: "",
                detectedConditions: "",
                tobaccoConsumption: "",
                cigarettesPerWeekBefore: "",
                cigarettesPerWeekAfter: "",
                papSmearTestStatus: "",
                papSmearTestYear: "",
                papSmearTestResult: "",
                colposcopyStatus: "",
                colposcopyYear: "",
                colposcopyResult: "",
                hysterectomyStatus: "",
                hysterectomyReason: "",
                lastMenstruationDate: "",
                firstMenstruationAge: "",
                sexualActivityStatus: "",
                firstSexualActivityAge: "",
                sexualPartnerCount: "",
                contraceptiveMethod: "",
                contraceptiveDuration: "",
                pregnancyStatus: "",
                childbirthCount: "",
                cesareanCount: "",
                abortionStatus: "",
                abortionCount: "",
            });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="container form-component appointment-form">
            <h2>Cuestionario Preventix</h2>
            <form onSubmit={handleAppointment}>
                {/* Form fields based on schema */}
                <div>
                    <input
                        type="checkbox"
                        name="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={handleChange}
                    />
                    <label htmlFor="privacyConsent">Privacy Consent</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="informedConsent"
                        checked={formData.informedConsent}
                        onChange={handleChange}
                    />
                    <label htmlFor="informedConsent">Informed Consent</label>
                </div>
                <div>
                    <input
                        type="number"
                        name="fastingHours"
                        placeholder="Fasting Hours"
                        value={formData.fastingHours}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div>
                    <input
                        type="time"
                        name="lastMealTime"
                        placeholder="Last Meal Time"
                        value={formData.lastMealTime}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastMealType"
                        placeholder="Last Meal Type"
                        value={formData.lastMealType}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="patientFirstName"
                        placeholder="Patient First Name"
                        value={formData.patientFirstName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="patientLastName"
                        placeholder="Patient Last Name"
                        value={formData.patientLastName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="patientMotherLastName"
                        placeholder="Patient Mother Last Name"
                        value={formData.patientMotherLastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name="birthDate"
                        placeholder="Birth Date"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <select
                        name="areaType"
                        value={formData.areaType}
                        onChange={handleChange}
                    >
                        <option value="">Select Area Type</option>
                        <option value="Urbana">Urbana</option>
                        <option value="Rural">Rural</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                    >
                        <option value="">Select Education Level</option>
                        <option value="Educación básica">Educación básica</option>
                        <option value="Educación media">Educación media</option>
                        <option value="Educación media superior">Educación media superior</option>
                        <option value="Educación superior">Educación superior</option>
                        <option value="Postgrado">Postgrado</option>
                        <option value="No tengo estudios">No tengo estudios</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <input
                        type="text"
                        name="sampleLocation"
                        placeholder="Sample Collection Location"
                        value={formData.sampleLocation}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="confirmEmail"
                        placeholder="Confirm Email"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="mobilePhone"
                        placeholder="Mobile Phone"
                        value={formData.mobilePhone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="weightKg"
                        placeholder="Weight (kg)"
                        value={formData.weightKg}
                        onChange={handleChange}
                        min="0"
                    />
                    <input
                        type="number"
                        name="heightM"
                        placeholder="Height (m)"
                        value={formData.heightM}
                        onChange={handleChange}
                        min="0"
                    />
                    <select
                        name="vphVaccination"
                        value={formData.vphVaccination}
                        onChange={handleChange}
                    >
                        <option value="">Select VPH Vaccination</option>
                        <option value="Sí, recibí 1 dosis">Sí, recibí 1 dosis</option>
                        <option value="Sí, recibí 2 dosis">Sí, recibí 2 dosis</option>
                        <option value="Sí, recibí 3 dosis">Sí, recibí 3 dosis</option>
                        <option value="Sí, no recuerdo cuántas dosis">Sí, no recuerdo cuántas dosis</option>
                        <option value="No">No</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                </div>
                <div>
                    <textarea
                        name="detectedConditions"
                        placeholder="Detected Conditions"
                        value={formData.detectedConditions}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <select
                        name="tobaccoConsumption"
                        value={formData.tobaccoConsumption}
                        onChange={handleChange}
                    >
                        <option value="">Select Tobacco Consumption</option>
                        <option value="Sí, todavía fumo">Sí, todavía fumo</option>
                        <option value="Sí, pero dejé de fumar">Sí, pero dejé de fumar</option>
                        <option value="No, nunca he fumado">No, nunca he fumado</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <input
                        type="number"
                        name="cigarettesPerWeekBefore"
                        placeholder="Cigarettes Per Week (Before)"
                        value={formData.cigarettesPerWeekBefore}
                        onChange={handleChange}
                        min="0"
                    />
                    <input
                        type="number"
                        name="cigarettesPerWeekAfter"
                        placeholder="Cigarettes Per Week (After)"
                        value={formData.cigarettesPerWeekAfter}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div>
                    <select
                        name="papSmearTestStatus"
                        value={formData.papSmearTestStatus}
                        onChange={handleChange}
                    >
                        <option value="">Select Pap Smear Test Status</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <input
                        type="number"
                        name="papSmearTestYear"
                        placeholder="Pap Smear Test Year"
                        value={formData.papSmearTestYear}
                        onChange={handleChange}
                        min="0"
                    />
                    <input
                        type="text"
                        name="papSmearTestResult"
                        placeholder="Pap Smear Test Result"
                        value={formData.papSmearTestResult}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <select
                        name="colposcopyStatus"
                        value={formData.colposcopyStatus}
                        onChange={handleChange}
                    >
                        <option value="">Select Colposcopy Status</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <input
                        type="number"
                        name="colposcopyYear"
                        placeholder="Colposcopy Year"
                        value={formData.colposcopyYear}
                        onChange={handleChange}
                        min="0"
                    />
                    <input
                        type="text"
                        name="colposcopyResult"
                        placeholder="Colposcopy Result"
                        value={formData.colposcopyResult}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <select
                        name="hysterectomyStatus"
                        value={formData.hysterectomyStatus}
                        onChange={handleChange}
                    >
                        <option value="">Select Hysterectomy Status</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <textarea
                        name="hysterectomyReason"
                        placeholder="Hysterectomy Reason"
                        value={formData.hysterectomyReason}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name="lastMenstruationDate"
                        placeholder="Last Menstruation Date"
                        value={formData.lastMenstruationDate}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="firstMenstruationAge"
                        placeholder="First Menstruation Age"
                        value={formData.firstMenstruationAge}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div>
                    <select
                        name="sexualActivityStatus"
                        value={formData.sexualActivityStatus}
                        onChange={handleChange}
                    >
                        <option value="">Select Sexual Activity Status</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <input
                        type="number"
                        name="firstSexualActivityAge"
                        placeholder="First Sexual Activity Age"
                        value={formData.firstSexualActivityAge}
                        onChange={handleChange}
                        min="0"
                    />
                    <input
                        type="number"
                        name="sexualPartnerCount"
                        placeholder="Sexual Partner Count"
                        value={formData.sexualPartnerCount}
                        onChange={handleChange}
                        min="0"
                    />
                    <select
                        name="contraceptiveMethod"
                        value={formData.contraceptiveMethod}
                        onChange={handleChange}
                    >
                        <option value="">Select Contraceptive Method</option>
                        <option value="Píldoras">Píldoras</option>
                        <option value="Condón">Condón</option>
                        <option value="DIU">DIU</option>
                        <option value="Implante">Implante</option>
                        <option value="Inyección">Inyección</option>
                        <option value="Esponja">Esponja</option>
                        <option value="Diafragma">Diafragma</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <input
                        type="number"
                        name="contraceptiveDuration"
                        placeholder="Contraceptive Duration"
                        value={formData.contraceptiveDuration}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div>
                    <select
                        name="pregnancyStatus"
                        value={formData.pregnancyStatus}
                        onChange={handleChange}
                    >
                        <option value="">Select Pregnancy Status</option>
                        <option value="Embarazada">Embarazada</option>
                        <option value="No embarazada">No embarazada</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <input
                        type="number"
                        name="childbirthCount"
                        placeholder="Childbirth Count"
                        value={formData.childbirthCount}
                        onChange={handleChange}
                        min="0"
                    />
                    <input
                        type="number"
                        name="cesareanCount"
                        placeholder="Cesarean Count"
                        value={formData.cesareanCount}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div>
                    <select
                        name="abortionStatus"
                        value={formData.abortionStatus}
                        onChange={handleChange}
                    >
                        <option value="">Select Abortion Status</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                        <option value="Prefiero no contestar">Prefiero no contestar</option>
                    </select>
                    <input
                        type="number"
                        name="abortionCount"
                        placeholder="Abortion Count"
                        value={formData.abortionCount}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <button type="submit">Submit Appointment</button>
            </form>
        </div>
    );
};

export default AppointmentForm;
