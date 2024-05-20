import {Appointment} from "../models/appointmentSchema.js";
import mongoose from 'mongoose';

// Función para obtener los contadores de procesamiento de tomas
async function getProcessingStats() {
    return Appointment.aggregate([
        {
            $group: {
                _id: null,
                TomasRecibidaCount: {
                    $sum: {
                        $cond: ["$tomaRecibida", 1, 0]
                    }
                },
                TomasProcesadaCount: {
                    $sum: {
                        $cond: ["$tomaProcesada", 1, 0]
                    }
                },
                TomasEnviadaCount: {
                    $sum: {
                        $cond: ["$tomaEnviada", 1, 0]
                    }
                },
                TomasEntregadaCount: {
                    $sum: {
                        $cond: ["$tomaEntregada", 1, 0]
                    }
                }
            }
        }
    ]);
}

// Función para obtener la distribución de edad
async function getAgeDistribution() {
    return Appointment.aggregate([
        {
            $project: {
                age: {
                    $floor: {
                        $divide: [
                            {
                                $subtract: [new Date(), "$birthDate"]
                            },
                            (365 * 24 * 60 * 60 * 1000)
                        ]
                    }
                }
            }
        }, {
            $group: {
                _id: "$age",
                count: {
                    $sum: 1
                }
            }
        }
    ]);
}

// Función para obtener la distribución por tipo de área
async function getAreaTypeDistribution() {
    return Appointment.aggregate([
        {
            $group: {
                _id: "$areaType",
                count: {
                    $sum: 1
                }
            }
        }
    ]);
}

// Función para obtener la distribución por nivel educativo
async function getEducationLevelDistribution() {
    return Appointment.aggregate([
        {
            $group: {
                _id: "$educationLevel",
                count: {
                    $sum: 1
                }
            }
        }
    ]);
}

export const getDashboardData = async (req, res) => {
    try {
        const processingStats = await getProcessingStats();
        const ageDistribution = await getAgeDistribution();
        const areaTypeDistribution = await getAreaTypeDistribution();
        const educationLevelDistribution = await getEducationLevelDistribution();

        res
            .status(200)
            .json({
                success: true,
                data: {
                    processingStats: processingStats[0] || {},
                    ageDistribution,
                    areaTypeDistribution,
                    educationLevelDistribution
                }
            });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res
            .status(500)
            .json(
                {success: false, message: "Error al obtener los datos del dashboard", error: error.message}
            );
    }
};
