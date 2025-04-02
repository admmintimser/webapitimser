import mongoose from "mongoose";

const preventixSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    tiempoInicioProceso: {
      type: Date,
      required: true,
    },
    estatusMuestra: String,
    tiempoFinProceso: Date,
    temperatura: String,
    folioDevelab: String,
    interpretacionPreventix: String,
    estatusWesternBlot: String,
    lavoWestern: String,
    fechaPrecipitado: Date,
    fechaLavado: Date,
    tecnicoWB: String,
    resultadoWesternBlot: String,
    estatusElisa: String,
    lavoElisa: String,
    numeroPlaca: String,
    lugarProceso: String,
    resultadoElisa: String,
    estatusTomaMuestra: {
      type: Boolean,
      default: false,
    },
    estatusRecepcion: {
      type: Boolean,
      default: false,
    },
    estatusELisa: {
      type: Boolean,
      default: false,
    },
    estatusWB: {
      type: Boolean,
      default: false,
    },
    estatusValidacion: {
      type: Boolean,
      default: false,
    },
    estatusLiberacion: {
      type: Boolean,
      default: false,
    },
    resultadosEnviados: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Preventix = mongoose.model("Preventix", preventixSchema);
